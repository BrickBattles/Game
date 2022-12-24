import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

const Home = () => {
  
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io({        
        forceNew: true,
      });
      
      socket.on("connect", () => {                
        socket.emit('join', {data: 'player data'});
      });
            
    };

    socketInitializer();
  }, []);
    
};

export default Home;
