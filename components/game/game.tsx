import React, { useEffect, useState } from 'react';

import { Types } from 'ably';
import { NextPage } from 'next';
import GameConfig from '../util/GameConfig';
import EventsCenter from '../util/EventsCenter';
import { MatchData } from '../../classes/matchData';
import { configureAbly, useChannel } from '@ably-labs/react-hooks';

import Ably from 'ably/promises';

const Game: NextPage<{ id: string }> = ({ id }) => {
  const ChannelName = `Match:${id}`;
  const [clientId, setClientId] = useState('');
  const [ably, setAbly] = useState<Ably.Types.RealtimePromise | Ably.Realtime>(
    new Ably.Realtime.Promise({ authUrl: 'api/createTokenRequest' })
  );

  // start phaser game
  useEffect(() => {
    async function init() {
      await ably.connection.once('connected');
      setClientId(`${ably.auth.clientId!}`);

      const channel = ably.channels.get(ChannelName);

      channel.attach();
      channel.presence.enter();

      channel.subscribe((message: Types.Message) => {
        if (message.name === 'initialize') {
          EventsCenter.emit('initialize', message.data);
        }
      });

      EventsCenter.on('update_match', (match: MatchData) => {
        channel.publish('update_match', match);
      });

      const Phaser = await import('phaser');
      const PhaserGame = new Phaser.Game(GameConfig);
      PhaserGame.registry.set('id', id);
      PhaserGame.registry.set('clientId', ably.auth.clientId!);
    }
    init();
  }, []);

  return (
    <div>
      <div id='game-content' key='game-content' className='block'>
        {/* where the canvas will be rendered */}
      </div>

      <div className='text-center'>
        <span>client: {clientId}</span>
        <br></br>
        <span>{ChannelName}</span>
      </div>
    </div>
  );
};

export default Game;
