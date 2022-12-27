import { NextPage } from "next";
import { Match, MatchState } from "../../classes/match";

const MatchTable: NextPage<{data: any, join: Function}> = ({ 
  data,
  join
}) => {

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
                    Waiting
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
