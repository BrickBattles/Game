import React, { useEffect, useState } from 'react';
import { useChannel } from '../util/AblyReactEffect';
import { Types } from 'ably';
import { NextPage } from 'next';
import GameConfig from '../util/GameConfig';
import EventsCenter from '../util/EventsCenter';
import { Match } from '../../classes/match';

const Game: NextPage<{ id: string }> = ({ id }) => {
  const ChannelName = `Match:${id}`;

  const [channel, ably]: any = useChannel(ChannelName, (message: Types.Message) => {
    console.log(`Received message: ${message.data} (name: ${message.name})`);
    if (message.name === 'initialize') {
      console.log(`Received message: ${message.data} (name: ${message.name})`);
      EventsCenter.emit('initialize', message.data);
    }
  });

  // const sendMatchData = (message_text: string) => {
  //   channel.publish({ name: ChannelName, data: message_text });
  // };

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import('phaser');
      const PhaserGame = new Phaser.Game(GameConfig);
      PhaserGame.registry.set('id', id);
    }
    initPhaser();
  }, []);

  return (
    <div>
      <div id='game-content' key='game-content' className='block'>
        {/* where the canvas will be rendered */}
      </div>

      <div className='text-center'>
        <span>id: {id}</span>
        <br></br>
        <span>{ChannelName}</span>
      </div>
    </div>
  );
};

export default Game;
