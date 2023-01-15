import Ably from 'ably/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import MatchController from './matchController';
import * as util from 'util';

let matchController: MatchController;

let setup = () => {
  if (!matchController) {
    matchController = MatchController.Instance;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  setup();

  const client = new Ably.Realtime({
    key: process.env.ABLY_API_KEY!,
    clientId: 'server',
  });
  const id = req.query.id;

  const channel = client.channels.get(`Match:${id}`);
  await channel.attach();
  await channel.presence.enter();

  let player_ids: string[] = [];

  // @ts-ignore
  channel.presence.get((err: any, members: any) => {
    console.log('members', members);
    members.forEach((member: any) => {
      if (member.clientId != 'server') {
        player_ids.push(member.clientId);
      }
    });
  });

  // for singleplayer debugging
  if (player_ids.length < 2) {
    player_ids.push('player2');
  }

  const match = matchController.initMatch(`${id}`, player_ids[0], player_ids[1]);

  channel.subscribe((message) => {
    if (message.name == 'initialize') {
      // console.log(message.data);
    }
  });

  channel.publish('initialize', JSON.stringify(match.toJSON()));
  res.status(200).json('');
};
