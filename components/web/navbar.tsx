import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <a className='btn btn-ghost normal-case text-xl'>BrickBattles</a>
      </div>
      <div className='navbar-end'>
        <ConnectButton />
      </div>
    </div>
  );
}
