import * as matter from 'matter-js';
import { MatchData, MatchDataStorage, PlayerData } from '../../../classes/matchData';

class MatchController {
  private static _instance: MatchController;

  storage: MatchDataStorage = new MatchDataStorage();

  private constructor() {
    // matter.Engine.create();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getMatch(id: string): MatchData {
    if (!this.storage.hasMatch(id)) {
      this.storage.addMatch(new MatchData(id));
    }
    return this.storage.getMatch(id);
  }

  public initMatch(id: string, player_id: string, enemy_id: string): MatchData {
    const m = this.getMatch(id);

    m.addPlayer(new PlayerData(player_id));
    m.addPlayer(new PlayerData(enemy_id));

    this.storage.matches[id] = m;
    return m;
  }
}

export default MatchController;
