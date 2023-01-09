import dynamic from 'next/dynamic';

const AblyGame = dynamic(() => import('../components/game/AblyGame'), { ssr: false });

export default function Home() {

  return (
    <div>
        <AblyGame />
    </div>
  );
};


