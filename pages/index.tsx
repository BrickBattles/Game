import dynamic from 'next/dynamic';
import MatchTable from '../components/web/matchTable';
import Navbar from '../components/web/navbar';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import React, { useEffect, useState } from 'react';

import { StreamrClient } from 'streamr-client';
import { InjectedConnector } from '@wagmi/core';

import axios, { Axios } from 'axios';

const Game = dynamic(() => import('../components/game/game'), { ssr: false });

enum AuthState {
  UNAUTHENTICATED,
  AUTHENTICATED,
}

enum HomeState {
  MATCH_TABLE,
  GAME,
  WAITING,
}

function Home({ address, session }: { address: any; session: any }) {
  const [authState, setAuthState] = useState<AuthState>(AuthState.UNAUTHENTICATED);
  const [homeState, setHomeState] = useState<HomeState>(HomeState.MATCH_TABLE);

  useEffect(() => {
    if (address) setAuthState(AuthState.AUTHENTICATED);
    else setAuthState(AuthState.UNAUTHENTICATED);
  }, [session]);

  const joinMatch = async () => {
    // tell server to create match
    let res = await fetch(`http://localhost:3000/api/match`).then((res) => res.json());
    const matchId = res.matchId;
    const streamId = res.streamId;

    const connector = new InjectedConnector();
    const provider = await connector.getProvider();

    const streamr = new StreamrClient({
      logLevel: 'debug',
      auth: {
        ethereum: provider,
      },
    });

    await streamr.subscribe(streamId, (content, metadata) => {
      console.log('received message', content, metadata);
      if (content === 'start') setHomeState(HomeState.GAME);
    });
  };

  return (
    <div>
      <Navbar />
      {authState === AuthState.AUTHENTICATED ? (
        <div className='hero min-h-screen bg-base-200'>
          <div className='hero-content text-center'>
            <div className='max-w-md'>
              <h1 className='text-5xl font-bold'>Brick Battles</h1>
              {homeState === HomeState.MATCH_TABLE ? <MatchTable /> : <Game />};
            </div>
          </div>
        </div>
      ) : (
        <div className='hero min-h-screen bg-base-200'>
          <div className='hero-content text-center'>
            <div className='max-w-md'>
              <h1 className='text-5xl font-bold'>Brick Battles</h1>

              <h1>Please connect your wallet to continue</h1>
            </div>
          </div>
        </div>
      )}
      ;
      <footer>
        {address ? <h1>Authenticated as {address}</h1> : <h1>Unauthenticated</h1>}
        {session ? <h1>Session: {JSON.stringify(session)}</h1> : <h1>No session</h1>}
      </footer>
      <button
        className='btn btn-primary'
        onClick={() => {
          fetch(`http://localhost:3000/api/match/join`)
            .then((res) => res.json())
            .then(console.log);
        }}
      >
        {' '}
        Join Match{' '}
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  return {
    props: {
      address,
      session,
    },
  };
};

export default Home;
