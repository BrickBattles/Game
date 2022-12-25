import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import MatchTable from "../components/web/matchTable";
import Game from "../components/game/game";

import {Match, MatchState} from "../classes/match";
import {Player, PlayerState} from "../classes/player";

let socket: Socket;

const Home = () => {
  
  let [matchDisplay, setMatchDisplay] = useState({});  
  let [match_id, setMatch_id] = useState('');

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io({forceNew: true});

      socket.on("connect", () => {            
        socket.emit("join_game", '0x00');
        
        socket.on("update_match_table", (data) => {            
            setMatchDisplay(data);
          }
        );

        socket.on("start_match", (match_id: string) => {
          setMatch_id(match_id);
        });
      });
    };

    socketInitializer();
  }, []);

  const createMatch = () => {       
    socket.emit("create_match");
  };

  const joinMatch = (id: string) => {
    socket.emit("join_match", id);
  };

  return (
    <div>
      {match_id ? (
        <div>
          <Game matchID={match_id} socket={socket!}/>
        </div>
      ) : (
        <div>
          <button className="btn" onClick={createMatch}>
            Create
          </button>

          <MatchTable data={matchDisplay} join={joinMatch} />
        </div>
      )}
    </div>
  );
};

export default Home;
