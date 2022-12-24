// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";
import { v4 as uuidv4, validate } from "uuid";

import { Match, MatchStorage, Player, PlayerStorage } from "../../customTypes/game";
import { MatchState, PlayerState } from "../../customTypes/states";

// socketid -> player data
let playerData: PlayerStorage = {};
let matchData: MatchStorage = {};

const SocketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      
      socket.on("join", (data: Player) => {
        console.log(`player_joined: ${data.address}`);

        playerData[data.address] = data;
        
        // init new player with matchData
        socket.emit("update_matchData", matchData);
      });

      socket.on("disconnect", () => {
        console.log(`player_left: ${socket.id}`);
      });

      socket.on("createMatch", (data: Match) => {
        let id = uuidv4();
        data.id = id;
        matchData[id] = data;
        matchData[id].state = MatchState.WAITING_FOR_PLAYERS;

        socket.broadcast.emit("update_matchData", matchData);
        socket.emit("update_matchData", matchData);
      });

      socket.on("joinMatch", (id: string, p: Player) => {
        if (
          matchData[id] &&
          matchData[id].state == MatchState.WAITING_FOR_PLAYERS &&
          Object.keys(matchData[id].playerData).length < 2 &&
          playerData[p.address] &&
          playerData[p.address].state == PlayerState.READY
        ) {
          p.state = PlayerState.IN_MATCH;
          playerData[p.address] = p; 
          matchData[id].playerData[p.address] = p;

          if (Object.keys(matchData[id].playerData).length == 2) {
            matchData[id].state = MatchState.READY;
          }

          socket.broadcast.emit("update_matchData", matchData);
          socket.emit("update_matchData", matchData);

          console.log(`player_joined: ${p.address} to match: ${id}`);
        }
      });
    });
  }

  res.end();
};
export default SocketHandler;
