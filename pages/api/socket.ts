// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Server, Socket } from "socket.io";

// socketid -> player data
let players: {[key: string]: any} = {};

const SocketHandler = (req: any, res: any) => {

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      
      socket.on('join', (data: any) => {        
        players[socket.id] = data;
        socket.emit('player_joined', socket.id);
        console.log('player_joined: ' + socket.id);        
      });

      socket.on('disconnect', () => {                      
        console.log(`player_left: ${socket.id}`);
      });

      // io.on("disconnect", (socket) => {            
      //   console.log('io disconnected')
        
      // });
  
    });

    

  }  

  res.end()
}
export default SocketHandler
