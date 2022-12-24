import { SocketAddress } from "net";
import { use, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4, validate } from "uuid";
import MatchTable from "../components/matchTable";

import { Match, MatchStorage, Player, PlayerStorage} from "../customTypes/game";
import { MatchState, PlayerState } from "../customTypes/states";

let socket: Socket;

const Home = () => {
  let [matchData, setMatchData] = useState<MatchStorage>({});
    
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io({
        forceNew: true,
      });

      socket.on("connect", () => {        
        socket.emit("join", { data: "player data", address: uuidv4(), state: PlayerState.NEW});
        // socket.emit("join", { data: "player data", address: '0x00123', state: PlayerState.NEW});

        socket.on("update_matchData", (curMatches:{[key: string]: Match}) => {          
          setMatchData(curMatches);          
        });
        
      });
    };

    socketInitializer();
  }, []);

  const createMatch = () => {
    let m: Match = {id: "123", playerData: {}, state: MatchState.NEW}
    socket.emit("createMatch", m);    
  };

  return (
    <div>
      <button className="btn" onClick={createMatch}>
        Create
      </button>
      
      <MatchTable {...matchData}/>

      
    </div>
  );
};

export default Home;
