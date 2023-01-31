import dynamic from 'next/dynamic';
import MatchTable from '../components/web/matchTable';
import Navbar from '../components/web/navbar';

const Game = dynamic(() => import('../components/game/game'), { ssr: false });

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import React from 'react';

function Home({ address, session }: { address: any; session: any }) {
  return (
    <div>
      <Navbar />

      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            {/* <h1 className='text-5xl font-bold'>Brick Battles</h1> */}
            {address ? <h1>Authenticated as {address}</h1> : <h1>Unauthenticated</h1>}
            {session ? <h1>Session: {JSON.stringify(session)}</h1> : <h1>No session</h1>}
            {/* <MatchTable /> */}
            {/* <Game /> */}
          </div>
        </div>
      </div>
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
