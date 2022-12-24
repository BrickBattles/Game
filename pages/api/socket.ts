// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";
import { v4 as uuidv4, validate } from "uuid";

import { Match, Player} from "../../customTypes/game";
import { MatchState, PlayerState } from "../../customTypes/states";

// socketid -> player data
let players: { [key: string]: Player } = {};
let matches: { [key: string]: Match } = {};

const SocketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      
      socket.on("join", (data: Player) => {
        players[data.address] = data;

        // init new player with matches
        socket.emit("update_matches", matches);
      });

      socket.on("disconnect", () => {
        console.log(`player_left: ${socket.id}`);
      });

      socket.on("createMatch", (data: Match) => {
        let id = uuidv4();
        data.id = id;
        matches[id] = data;
        matches[id].state = MatchState.WAITING_FOR_PLAYERS;

        socket.broadcast.emit("update_matches", matches);
        socket.emit("update_matches", matches);
      });

      socket.on("joinMatch", (id: string, p: Player) => {
        if (
          matches[id] &&
          matches[id].state == MatchState.WAITING_FOR_PLAYERS &&
          matches[id].players.length < 2 &&
          players[p.address] &&
          players[p.address].state == PlayerState.READY
        ) {
          p.state = PlayerState.IN_MATCH;
          players[p.address] = p;
          matches[id].players.push(p);

          if (matches[id].players.length == 2) {
            matches[id].state = MatchState.READY;
          }

          socket.broadcast.emit("update_matches", matches);
          socket.emit("update_matches", matches);

          console.log(`player_joined: ${p.address} to match: ${id}`);
        }
      });
    });
  }

  res.end();
};
export default SocketHandler;
