import { NextApiRequest, NextApiResponse } from 'next';
// import StreamrClient from 'streamr-client';
// import MatchController from './matchController';

// let matchController: MatchController;

// let setup = () => {
//   if (!matchController) {
//     matchController = MatchController.Instance;
//   }
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   setup();
  //   const matchId = '123'; // uuidv4();
  //   const streamr = new StreamrClient({
  //     logLevel: 'debug',
  //     auth: {
  //       privateKey: process.env.PRIV_KEY!,
  //     },
  //   });
  //   const stream = await streamr.getOrCreateStream({
  //     id: `${process.env.NEXT_PUBLIC_DEV_ADDRESS}/match/${matchId}`,
  //   });
  //   await streamr.subscribe(stream.id, (content, metadata) => {
  //     console.log('received message', content, metadata);
  //   });
  //   await stream.publish({ timestamp: Date.now() });
  // res.status(200).json({ streamId: stream.id, matchId: matchId });
  res.status(200);
};
