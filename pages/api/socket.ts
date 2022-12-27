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

      socket.on("get_match_data", (match_id: string) => {
        socket.emit("update_match_data", manager.getMatchData(match_id))
      });
      

      socket.on("req_update_game", (match_id: string, p: Player) => {
        console.log(p)
        manager.updatePlayer(match_id, p);
        socket.emit('res_update_game', manager.getMatchData(match_id));        
      });

      socket.on("join_match", (match_id: string) => {
        
        if (manager.joinMatch(match_id, socket.id)) {          
          let players = manager.getMatchById(match_id);
          let other_player = Object.values(players.players).find(p => p.id != socket.id);
          
          if (!other_player) {
            console.log('join match failed couldnt find other player')
            console.log(`players: ${players.players}`)
            return
          };
          io.sockets.sockets.get(other_player.id)?.join(match_id);          
          io.sockets.sockets.get(socket.id)?.join(match_id)
          io.to(match_id).emit("start_match", match_id);
        }
        else {
          console.log('join match failed')
        }
      });

    });
  }

  res.end();
};
export default SocketHandler;


