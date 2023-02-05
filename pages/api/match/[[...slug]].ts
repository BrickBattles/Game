import { NextApiRequest, NextApiResponse } from 'next';
import { Match, MatchState } from '../../../classes/match';
import StreamrClient from 'streamr-client';

class MatchController {
  matches: Map<string, Match> = new Map();
  streamr: StreamrClient = new StreamrClient({
    logLevel: 'debug',
    auth: {
      privateKey: process.env.PRIV_KEY!,
    },
  });

  getMatch(matchId: string) {
    return this.matches.get(matchId);
  }

  async createMatch(matchId: string) {
    const stream = await this.streamr.getOrCreateStream({
      id: `${process.env.NEXT_PUBLIC_DEV_ADDRESS}/match/${matchId}`,
    });
    this.matches.set(matchId, new Match(matchId, stream.id));
    return stream.id;
  }

  async joinMatch(matchId: string, userId: string) {
    if (this.matches.has(matchId)) {
      let m = this.matches.get(matchId) as Match;
      if (m.players.size < 2) {
        m.players.add(userId);
        if (m.players.size === 2) {
          m.state = MatchState.STARTING;
        }
        this.matches.set(matchId, m);
        return true;
      } else {
        console.log('match full');
      }
    } else {
      console.log('match not found');
      console.log(this.matches);
    }
    return false;
  }

  async leaveMatch(matchId: string, playerAddr: string) {
    if (this.matches.has(matchId)) {
      let m = this.matches.get(matchId) as Match;
      if (m.players.has(playerAddr)) {
        m.players.delete(playerAddr);
        this.matches.set(matchId, m);
        return true;
      }
    }
    return false;
  }

  async getAllStreams() {
    const data: { [key: string]: any } = {};
    const streams = this.streamr.searchStreams('match', undefined);

    for await (const stream of streams) {
      data[stream.id] = stream;
    }
    return data;
  }
  async getTableData() {
    return this.matches.values();
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let matchController = new MatchController();
  const { slug } = req.query;
  let matchId = '123';

  if (slug) {
    let opt = slug[0];

    if (opt === 'create') {
      let streamId = await matchController.createMatch(matchId);
      res.status(200).json({ streamId: streamId, matchId: matchId });
    } else if (opt === 'join') {
      let matchId = req.body.matchId as string;
      let userId = req.body.userId as string;

      let join = await matchController.joinMatch(matchId, userId);

      if (!join) {
        res.status(400).json({ error: `User: ${userId} Joining match: ${matchId} failed` });
      } else {
        res.status(200).json({ matchId: matchId });
      }
    } else if (opt === 'getAll') {
      let data = await matchController.getTableData();
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: `Invalid slug: ${slug} ${opt}` });
    }
  } else {
    res.status(400).json({ error: `no slug: ${slug}` });
  }
};
