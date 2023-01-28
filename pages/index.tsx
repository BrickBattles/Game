import dynamic from 'next/dynamic';
import Navbar from '../components/web/navbar';

const Game = dynamic(() => import('../components/game/game'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Brick Battles</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
