// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";
import { v4 as uuidv4, validate } from "uuid";

import {
  Match,
  MatchStorage,
  Player,
  PlayerStorage,
} from "../../customTypes/game";
import { MatchState, PlayerState } from "../../customTypes/states";

// socketid -> player data
let playerData: PlayerStorage = {};
let matchData: MatchStorage = {};

const SocketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("join_game", (p: Player) => {
        console.log(`player_joined: ${socket.id}`);

        p.state = PlayerState.READY;
        playerData[socket.id] = p;


        // init new player with matchData
        socket.emit("update_matchData", matchData);
      });

      socket.on("disconnect", () => {
        console.log(`player_left: ${socket.id}`);
      });

      socket.on("create_match", (data: Match) => {
        let id = uuidv4();
        data.id = id;
        matchData[id] = data;
        matchData[id].state = MatchState.WAITING_FOR_PLAYERS;

        socket.broadcast.emit("update_matchData", matchData);
        socket.emit("update_matchData", matchData);
      });

      socket.on("join_match", (matchID: string) => {                
        if (
          matchData[matchID] &&
          matchData[matchID].state == MatchState.WAITING_FOR_PLAYERS &&
          Object.keys(matchData[matchID].playerData).length < 2
          ) {            
            
          if (
            playerData[socket.id] &&
            playerData[socket.id].state == PlayerState.READY
          ) {
            let p = playerData[socket.id];
            p.state = PlayerState.IN_MATCH;
            playerData[p.id] = p;
            matchData[matchID].playerData[p.id] = p;

            if (Object.keys(matchData[matchID].playerData).length == 2) {
              matchData[matchID].state = MatchState.READY;
            }

            socket.broadcast.emit("update_matchData", matchData);
            socket.emit("update_matchData", matchData);

            console.log(`player_joined_match: ${p.id} to match: ${matchID}`);
          }
          else {
            console.log(`FAILED player check join_match: ${matchID} to match: player ${socket.id} failed`);
          }
        }
        else {
          console.log(`FAILED match check join_match: ${matchID} to match: player ${socket.id} failed`);
        }
      });
    });
  }

  res.end();
};
export default SocketHandler;
