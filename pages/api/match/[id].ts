import Ably from 'ably/promises';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
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
