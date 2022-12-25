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
        socket.emit("join_game", { id: uuidv4(), data: "player data", address: '0x0012324', state: PlayerState.NEW});
        // socket.emit("join", { data: "player data", address: '0x00123', state: PlayerState.NEW});

        socket.on("update_matchData", (curMatches:{[key: string]: Match}) => {          
          console.log("update_matchData", curMatches)
          setMatchData(curMatches);          
        });
        
      });
    };

    socketInitializer();
  }, []);

  const createMatch = () => {
    let m: Match = {id: "123", playerData: {}, state: MatchState.NEW}
    socket.emit("create_match", m);    
  };
  
  const joinMatch = (matchId: string) => {
    socket.emit("join_match", matchId);
  };

  const test = () => {
    setMatchData({test: {id: "123", playerData: {}, state: MatchState.NEW}})
  }

  return (
    <div>
      <button className="btn" onClick={createMatch}>
        Create
      </button>

    <button className="btn" onClick={test}>
      test
      </button>

      
      <MatchTable data={matchData} join={joinMatch} />    
    </div>          
  );
};

export default Home;
