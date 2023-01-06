import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import MatchTable from "../components/web/matchTable";
import Game from "../components/game/devGame";

let socket: Socket;

const DevHome = () => {
  
  return (    
    <Game/>              
  );
};

export default DevHome;
