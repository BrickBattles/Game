import { NextApiRequest, NextApiResponse } from 'next';
import MatchController from './matchController';

let matchController = MatchController.Instance;
let setup = () => {
  if (!matchController) matchController = MatchController.Instance;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  setup();
  let data = await matchController.getTableData();
  console.log(data);
  res.status(200).json(data);
};
