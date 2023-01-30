import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';
import GameConfig from '../util/GameConfig';
import EventsCenter from '../util/EventsCenter';
import { MatchData } from '../../classes/matchData';

import { StreamrClient } from 'streamr-client';

const Game = () => {
  let streamId = '';
  let matchId = '';

  // start phaser game
  useEffect(() => {
    async function init() {
      let { streamId: streamId, matchId: matchId } = await fetch('/api/match').then((res) =>
        res.json()
      );

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
};

export default Game;
