import Ably from 'ably/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import MatchController from './matchController';

let matchController: MatchController;
let client: Ably.Realtime;

let setup = () => {
  if (!client || !client.connection) {
    client = new Ably.Realtime(process.env.ABLY_API_KEY!);
  }

  if (!matchController) {
    matchController = MatchController.Instance;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  setup();

  const id = req.query.id;

  const match = matchController.getMatch(id as string);

  const channel = client.channels.get(`Match:${id}`);

  channel.subscribe((message) => {
    if (message.name == 'initialize') {
      // console.log(message.data);
    }
  });

  console.log(match.toJSON());
  // channel.publish('initialize', JSON.stringify(match.toJSON()));
  channel.publish('initialize', 'hello');

  res.status(200).json('');
};
