import { useEffect } from "react";
import { Match, MatchStorage } from "../customTypes/game";
import { MatchState } from "../customTypes/states";

const MatchTable = (matchData: MatchStorage) => {
  useEffect(() => {
    console.log("MatchTable: ", matchData);
  }, [matchData]);

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

            {Object.keys(matchData).map((key) => {
              let match: Match = matchData[key];
              return (
                <tr>
                  <td>{match.id}</td>
                  <td> {`${Object.keys(match.playerData).length}/2`}
                    {/* {Object.keys(match.playerData).map((key) => {
                      let player = match.playerData[key];
                      return <>{player.address}</>;
                    })} */}
                  </td>
                  <td>{MatchState[match.state]}</td>
                  <td>100ETH</td>
                  <td>
                    <button className="btn btn-primary">Join</button>
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
