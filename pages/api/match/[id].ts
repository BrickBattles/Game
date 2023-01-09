import Ably from 'ably/promises';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
  //   const channelName = `Match:${req.body.id}`;
  //   const channel = client.channels.get(channelName);
  const channel = client.channels.get('Match');

  channel.subscribe((message) => {
    console.log(`message: ${JSON.stringify(message)}`);
  });
  channel.publish(
    'sprite',
    JSON.stringify({
      x: 200,
      y: 200,
    })
  );
  console.log('here');
  res.status(200).json('');
};
