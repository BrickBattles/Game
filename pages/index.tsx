import dynamic from 'next/dynamic';

const Game = dynamic(() => import('../components/game/game'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Game id={'test_id'} />
    </div>
  );
}
