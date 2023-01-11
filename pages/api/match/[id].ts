import Ably from 'ably/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import ServerMatch from './serverMatch';

let serverMatch: ServerMatch;
let client: Ably.Realtime;

let setup = () => {
  if (!client || !client.connection) {
    client = new Ably.Realtime(process.env.ABLY_API_KEY!);
  }

  if (!serverMatch) {
    serverMatch = ServerMatch.Instance;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  setup();

  const id = req.query.id;
  const channel = client.channels.get(`Match:${id}`);

  channel.subscribe((message) => {
    if (message.name == 'initialize') {
      console.log(message.data);
    }
  });

  channel.publish(
    'initialize',
    JSON.stringify({
      player_one: {
        x: 200,
        y: 200,
      },
      player_two: {
        x: 400,
        y: 200,
      },
    })
  );

  res.status(200).json('');
};
