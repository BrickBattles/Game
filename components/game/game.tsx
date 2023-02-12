import React, { useEffect, useState } from 'react';
import GameConfig from '../util/GameConfig';
import EventsCenter from '../util/EventsCenter';

import { StreamrClient } from 'streamr-client';

function Game({ streamId, matchId }: { streamId: string; matchId: string }) {
  if (streamId === undefined || streamId === '' || matchId === undefined || matchId === '') {
    streamId = `${process.env.NEXT_PUBLIC_DEV_ADDRESS}/match/123`; // default for testing
    matchId = '123';
  }
  // start phaser game
  useEffect(() => {
    async function init() {
      const Phaser = await import('phaser');
      const PhaserGame = new Phaser.Game(GameConfig);
      PhaserGame.registry.set('streamId', streamId);
      PhaserGame.registry.set('matchId', matchId);
      PhaserGame.registry.set(
        'streamr',
        new StreamrClient({
          logLevel: 'debug',
        })
      );
    }
    init();
  }, []);

  return (
    <div>
      <div id='game-content' key='game-content' className='block'>
        {/* where the canvas will be rendered */}
      </div>
    </div>
  );
}

export default Game;
