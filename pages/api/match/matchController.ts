import * as matter from 'matter-js';
import { Match, MatchStorage } from '../../../classes/match';
import { MatchData, MatchDataStorage, PlayerData } from '../../../classes/matchData';

class MatchController {
  private static _instance: MatchController;

  storage: MatchStorage = new MatchStorage();

  private constructor() {
    // matter.Engine.create();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getMatch(id: string): Match {
    if (!this.storage.hasMatch(id)) {
      this.storage.addMatch(new Match({ id }));
    }
    return this.storage.getMatch(id);
  }

  public initMatch(id: string, player_id: string, enemy_id: string): Match {
    const m = this.getMatch(id);

    m.addPlayer(new PlayerData(player_id));
    m.addPlayer(new PlayerData(enemy_id));

    this.storage.matches[id] = m;
    return m;
  }

  public getMatchData(id: string): MatchData {
    const m = this.getMatch(id);

    let md = new MatchData(id);

    for (let key in m.players) {
      const player = m.players[key];
      md.addPlayer(new PlayerData(key));
      md.players[key].position = player.position;
    }
    return md;
  }
}

export default MatchController;
