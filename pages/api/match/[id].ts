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

  const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
  const id = req.query.id;

  const match = matchController.initMatch(id as string, 'player1', 'player2');

  const channel = client.channels.get(`Match:${id}`);

  channel.subscribe((message) => {
    if (message.name == 'initialize') {
      // console.log(message.data);
    }
  });

  channel.publish('initialize', JSON.stringify(match.toJSON()));
  res.status(200).json('');
};
