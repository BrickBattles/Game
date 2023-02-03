import StreamrClient from 'streamr-client';
import { Match, MatchState } from '../../../classes/match';

class MatchController {
  private static _instance: MatchController;

  streamr: StreamrClient;
  matches: { [key: string]: Match } = {};

  private constructor() {
    this.streamr = new StreamrClient({
      logLevel: 'debug',
      auth: {
        privateKey: process.env.PRIV_KEY!,
      },
    });
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async getMatch(matchId: string) {
    return this.matches[matchId];
  }

  public async createMatch(matchId: string) {
    const stream = await this.streamr.getOrCreateStream({
      id: `${process.env.NEXT_PUBLIC_DEV_ADDRESS}/match/${matchId}`,
    });

    const match = new Match(matchId, stream.id);
    this.matches[matchId] = match;

    return stream.id;
  }

  public async joinMatch(matchId: string, playerAddr: string) {
    if (!this.matches[matchId]) {
      if (this.matches[matchId].players.size < 2) {
        this.matches[matchId].players.add(playerAddr);
        if (this.matches[matchId].players.size === 2) {
          this.matches[matchId].state = MatchState.STARTING;
        }
        return true;
      }
    }
    return false;
  }

  public async leaveMatch(matchId: string, playerAddr: string) {
    if (!this.matches[matchId]) {
      if (this.matches[matchId].players.has(playerAddr)) {
        this.matches[matchId].players.delete(playerAddr);
        return true;
      }
    }
    return false;
  }

  public async getAllStreams() {
    const data: { [key: string]: any } = {};
    const streams = this.streamr.searchStreams('match', undefined);

    for await (const stream of streams) {
      data[stream.id] = stream;
    }
    return data;
  }

  public async getTableData() {
    return this.matches;
  }
}

export default MatchController;
