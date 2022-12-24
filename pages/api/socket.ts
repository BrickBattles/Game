// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {

  if (res.socket.server.io) {
    console.log('socket is already running')
  } 
  else {
    const io = new Server(res.socket.server)
    res.socket.server.io = io
  }
  res.end()
}
export default SocketHandler
