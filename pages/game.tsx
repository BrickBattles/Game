import dynamic from 'next/dynamic';

const Game = dynamic(() => import('../components/game/game'), { ssr: false });

function GamePage({ streamId, matchId }: { streamId: string; matchId: string }) {
  return <Game streamId={streamId} matchId={matchId} />;
}

export default GamePage;
