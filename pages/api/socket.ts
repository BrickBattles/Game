// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Server, Socket } from "socket.io";
import Match from "../../customTypes/match";

// socketid -> player data
let players: {[key: string]: any} = {};
let matches: Array<Match> = [];

const SocketHandler = (req: any, res: any) => {

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      
      socket.on('join', (data: any) => {        
        players[socket.id] = data;
        socket.emit('update_matches', matches);        
      });

      socket.on('createMatch', (data: Match) => {
        matches.push(data);
        socket.broadcast.emit('update_matches', matches);        
        socket.emit('update_matches', matches);
      });

      socket.on('disconnect', () => {                      
        console.log(`player_left: ${socket.id}`);
      });
  
    });

    

  }  

  res.end()
}
export default SocketHandler
