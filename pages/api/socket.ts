// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";
import GameManager from "./gameManager";
import { Player } from "../../classes/player";

let manager: GameManager;

const SocketHandler = (req: any, res: any) => {
  if (!manager) {
    manager = GameManager.Instance;
  }

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("join_game", (addr: string) => {          
        if(manager.createPlayer(socket.id, addr)) {
          socket.emit("update_match_table", manager.getMatchDataForTable());
        }
        else {
          console.log('create player failed')
        }
        
      });

      socket.on("disconnect", () => {
        manager.removePlayer(socket.id);        
      });

      socket.on("create_match", () => {        
        if(manager.createMatch(socket.id)) {
          
          io.sockets.in('/').emit("update_match_table", manager.getMatchDataForTable());
          socket.emit("update_match_table", manager.getMatchDataForTable());
        }else {
          console.log('create match failed')
        }
      });

      socket.on("req_update_game", (match_id: string, p: Player) => {
        manager.updatePlayer(match_id, p);        
        socket.emit('res_update_game', manager.getOpponentData(match_id, p.id));
        console.log('res_update_game', manager.getOpponentData(match_id, p.id));
      });

      socket.on("join_match", (match_id: string) => {
        if (manager.joinMatch(match_id, socket.id)) {          
          let other_player = manager.getMatchById(match_id).player;
          io.sockets.sockets.get(other_player.id)?.join(match_id);          
          io.sockets.sockets.get(socket.id)?.join(match_id)
          io.to(match_id).emit("start_match", match_id);
        }                       
      });

    });
  }

  res.end();
};
export default SocketHandler;


