import React, { useEffect, useState } from 'react';
import GameConfig from '../util/GameConfig';
import EventsCenter from '../util/EventsCenter';

import { StreamrClient } from 'streamr-client';

function Game({ streamId, matchId }: { streamId: string; matchId: string }) {
  if (streamId === undefined || streamId === '') {
    streamId = `${process.env.NEXT_PUBLIC_DEV_ADDRESS}/match/123`; // default for testing
  }
  // start phaser game
  useEffect(() => {
    async function init() {
      const streamr = new StreamrClient({
        logLevel: 'debug',
      });

      await streamr.subscribe(streamId, (content, meta) => {
        console.log(`content: ${JSON.stringify(content)}`);
        console.log(`meta: ${JSON.stringify(meta)}`);
        console.log('-----------------');
      });

      // channel.subscribe((message: Types.Message) => {
      //   if (message.name === 'initialize') {
      //     EventsCenter.emit('initialize', message.data);
      //   }
      // });

      // EventsCenter.on('update_match', (match: MatchData) => {
      //   channel.publish('update_match', match);
      // });

      const Phaser = await import('phaser');
      const PhaserGame = new Phaser.Game(GameConfig);
      PhaserGame.registry.set('streamId', streamId);
      PhaserGame.registry.set('matchId', matchId);
    }
    init();
  }, []);

  return (
    <div>
      <div id='game-content' key='game-content' className='block'>
        {/* where the canvas will be rendered */}
      </div>

      <div className='text-center'>
        <span>{streamId}</span>
      </div>
    </div>
  );
}

export default Game;
