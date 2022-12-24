import { use, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import Match from "../customTypes/match";

let socket: Socket;

const Home = () => {
  let [matches, setMatches] = useState<Array<Match>>([]);
  
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io({
        forceNew: true,
      });

      socket.on("connect", () => {
        socket.emit("join", { data: "player data" });

        socket.on("update_matches", (curMatches: Array<Match>) => {          
          setMatches(curMatches);                    
        });
        
      });
    };

    socketInitializer();
  }, []);

  const createMatch = () => {
    let m: Match = {id: "123", players: []}
    socket.emit("createMatch", m);
  };

  return (
    <div>
      <button className="btn" onClick={createMatch}>
        Create
      </button>

      <h1>List of matches</h1>

      <>
        {matches ? (
          matches.map((data: Match, key) => {            
            
            return (
              <div key={key}>
                <h2>{`${data.id}`}</h2>                
              </div>
            );
          })                    
        ) : (
          <p>No matches</p>
        )}
      </>
    </div>
  );
};

export default Home;
