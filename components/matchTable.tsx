import { NextComponentType, NextPage } from "next";
import { useEffect } from "react";
import { Match, MatchStorage } from "../customTypes/game";
import { MatchState } from "../customTypes/states";
import WaitingModal from "./modals/waitingModal";

const MatchTable: NextPage<{data: MatchStorage, join: Function}> = ({ 
  data,
  join
}) => {

  useEffect(() => {
    console.log("MatchTable", data);
  }, [data]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>#</th>
              <th>Players</th>
              <th>State</th>
              <th>Amount</th>
              <th>Join</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}

            {Object.keys(data).map((key) => {
              let match: Match = data[key];
              return (
                <tr>
                  <td>{match.id}</td>
                  <td>                    
                    {`${Object.keys(match.playerData).length}/2`}
                  </td>
                  <td>{MatchState[match.state]}</td>
                  <td>100ETH</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => {
                      join(match.id)                      
                    }}>
                      Join
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchTable;
