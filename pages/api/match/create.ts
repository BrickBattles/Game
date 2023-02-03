import { NextApiRequest, NextApiResponse } from 'next';
import MatchController from './matchController';
import { v4 as uuidv4 } from 'uuid';

let matchController = MatchController.Instance;
let setup = () => {
  if (!matchController) matchController = MatchController.Instance;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  setup();
  // let matchId = uuidv4();
  let matchId = '123';
  let id = await matchController.createMatch(matchId);
  res.status(200).json({ streamId: id, matchId: matchId });
};
