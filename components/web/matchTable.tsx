import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Match, MatchState } from '../../classes/match';
import WaitingModal from './modals/waitingModal';
import axios from 'axios';

// for testing
import { v4 as uuidv4 } from 'uuid';

function MatchTable(props: any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    async function init() {
      const res = await fetch('http://localhost:3000/api/match/getAll').then((res) => res.json());
      setData(res);
    }
    init();
  }, []);

  async function createThenFetch() {
    setLoading(true);
    await fetch('http://localhost:3000/api/match/create');
    await fetch('http://localhost:3000/api/match/getAll')
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }

  async function joinThenFetch(matchId: string, userId: string) {
    setLoading(true);
    await axios.post(
      'http://localhost:3000/api/match/join',
      { matchId: matchId, userId: userId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    await fetch('http://localhost:3000/api/match/getAll')
      .then((res) => res.json())
      .then((res) => setData(res));
    setJoined(true);
    setLoading(false);
  }

  if (loading) return <WaitingModal header='Loading...' message='' />;

  if (joined) return <WaitingModal header='Success' message='Waiting for other players' />;

  return (
    <div>
      <div className='overflow-x-auto'>
        {Object.keys(data).length === 0 || data == undefined || data == null ? (
          <div>
            <h1>No matches available</h1>
          </div>
        ) : (
          <div>
            <table className='table table-zebra w-full'>
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
                {Object.entries(data).map(([key, m]) => {
                  let match: Match = m;
                  return (
                    <tr key={key}>
                      <td>{match.id}</td>
                      <td>{JSON.stringify(match.players)}</td>
                      <td>{MatchState[match.state]}</td>
                      <td>{match.amount}</td>
                      <td>
                        <button
                          className='btn btn-primary'
                          onClick={() => joinThenFetch('123', uuidv4())}
                        >
                          Join
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className='py-5'>
        <button className='btn btn-primary' onClick={createThenFetch}>
          Create Match
        </button>
      </div>
    </div>
  );
}

export default MatchTable;
