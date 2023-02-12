import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Match, MatchState } from '../../classes/match';
import WaitingModal from './modals/waitingModal';
import axios from 'axios';
import { useRouter } from 'next/router';

// for testing

function MatchTable(props: any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const router = useRouter();

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
    console.log(`Joining match ${matchId} with user ${userId}...`);
    setLoading(true);
    await axios
      .post(
        'http://localhost:3000/api/match/join',
        { matchId: matchId, userId: userId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('Successfully joined match');
        } else {
          console.log('Failed to join match (status code: ' + res.status + ')');
        }
      });

    await fetch('http://localhost:3000/api/match/getAll')
      .then((res) => res.json())
      .then((res) => setData(res));
    setJoined(true);
    setLoading(false);

    async function checkIfStarted() {
      await axios
        .post(
          'http://localhost:3000/api/match/checkIfStarted',
          { matchId: matchId },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log('started');
            router.push('/game');
          } else {
            console.log('not started');
            setTimeout(checkIfStarted, 1000);
          }
        });
    }

    await checkIfStarted();
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
                          onClick={() => joinThenFetch(match.id, props.address)}
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
