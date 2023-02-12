import dynamic from 'next/dynamic';
import MatchTable from '../components/web/matchTable';
import Navbar from '../components/web/navbar';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import React, { Children, useEffect, useState } from 'react';

import { StreamrClient } from 'streamr-client';
import { InjectedConnector } from '@wagmi/core';

enum AuthState {
  UNAUTHENTICATED,
  AUTHENTICATED,
}

function Home({ address, session }: { address: any; session: any }) {
  const [authState, setAuthState] = useState<AuthState>(AuthState.UNAUTHENTICATED);

  useEffect(() => {
    if (address) setAuthState(AuthState.AUTHENTICATED);
    else setAuthState(AuthState.UNAUTHENTICATED);
  }, [session]);

  return (
    <div>
      <Navbar />
      {authState === AuthState.AUTHENTICATED ? (
        <div className='hero min-h-screen bg-base-200'>
          <div className='hero-content text-center'>
            <div className='max-w-xl'>
              <MatchTable address={address} />
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
      <footer>
        {address ? <h1>Authenticated as {address}</h1> : <h1>Unauthenticated</h1>}
        {session ? <h1>Session: {JSON.stringify(session)}</h1> : <h1>No session</h1>}
      </footer>
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
