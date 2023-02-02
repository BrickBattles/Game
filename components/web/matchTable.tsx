import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Match, MatchState } from '../../classes/match';

const MatchTable: NextPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/api/match/getAll');
      const json = await res.json();
      console.log(json);
      setData(json);
    }
    if (loading) {
      fetchData();
      setLoading(false);
    }
  }, [loading]);

  return (
    <div>
      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
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
          <tbody>{/* <!-- row 1 --> */}</tbody>
          {data.map((match: Match) => {
            return (
              <tr>
                <td>{match.id}</td>
                <td>{JSON.stringify(match.players)}</td>
                <td>{MatchState[match.state]}</td>
                <td>{match.amount}</td>
                <td>
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      fetch('http://localhost:3000/api/match/join/' + match.id);
                    }}
                  >
                    Join
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <button
        className='btn btn-primary'
        onClick={() => {
          setLoading(true);
          fetch('http://localhost:3000/api/match/create');
        }}
      >
        Create Match
      </button>
    </div>
  );
};

export default MatchTable;
