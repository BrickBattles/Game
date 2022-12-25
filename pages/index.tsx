import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import MatchTable from "../components/web/matchTable";
import Game from "../components/game/game";

import {
  Match,
  MatchStorage,
  Player,
  PlayerStorage,
} from "../customTypes/game";
import { MatchState, PlayerState } from "../customTypes/states";


const Home = () => {
  
  let [socket, setSocket] = useState<Socket>();
  let [matchData, setMatchData] = useState<MatchStorage>({});  
  let [matchID, setMatchID] = useState<string>("");

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      setSocket(socket = io({forceNew: true,}));

      socket.on("connect", () => {
        socket!.emit("join_game", {
          id: "",
          data: "player data",
          address: "0x0012324",
          state: PlayerState.NEW,
        });
        // socket.emit("join", { data: "player data", address: '0x00123', state: PlayerState.NEW});

        socket!.on(
          "update_matchData",
          (curMatches: { [key: string]: Match }) => {
            console.log("update_matchData", curMatches);
            setMatchData(curMatches);
          }
        );

        socket!.on("start_match", (matchID: string) => {
          setMatchID(matchID);
        });
      });
    };

    socketInitializer();
  }, []);

  const createMatch = () => {
    let m: Match = { id: "123", playerData: {}, state: MatchState.NEW };
    socket!.emit("create_match", m);
  };

  const joinMatch = (matchId: string) => {
    socket!.emit("join_match", matchId);
  };

  return (
    <div>
      {matchID ? (
        <div>
          <Game matchID={matchID} socket={socket!}/>
        </div>
      ) : (
        <div>
          <button className="btn" onClick={createMatch}>
            Create
          </button>

          <MatchTable data={matchData} join={joinMatch} />
        </div>
      )}
    </div>
  );
};

export default Home;
