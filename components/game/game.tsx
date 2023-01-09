import React, { useEffect, useState } from 'react';
import { useChannel } from '../util/AblyReactEffect';
import { Types } from 'ably';
import { NextPage } from 'next';
import GameConfig from '../util/GameConfig';
import EventsCenter from '../util/EventsCenter';

const Game: NextPage<{ id: string }> = (id) => {
  // const ChannelName = `Match:${id}`;
  const ChannelName = `Match`;

  const [messageText, setMessageText] = useState('');
  const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably]: any = useChannel(ChannelName, (message: Types.Message) => {
    console.log(`Received message: ${message.data} (name: ${message.name})`);
    EventsCenter.emit('sprite', message.data);
  });

  const sendMatchData = (message_text: string) => {
    channel.publish({ name: ChannelName, data: message_text });
  };

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
    </div>
  );
};

export default Game;
