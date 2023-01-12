import * as matter from 'matter-js';
import { Match, MatchStorage } from '../../../classes/match';

class MatchController {
  private static _instance: MatchController;

  matchStorage: MatchStorage = new MatchStorage();

  private constructor() {
    // matter.Engine.create();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getMatch(id: string): Match {
    if (!this.matchStorage.hasMatch(id)) {
      this.matchStorage.addMatch(new Match({ id }));
      let m = this.matchStorage.getMatch(id);

      m.addPlayer({ id: 'player1' });
      m.addPlayer({ id: 'player2' });
    }
    return this.matchStorage.getMatch(id);
  }

  public initMatch(id: string, player_id: string, enemy_id: string) {
    const match = this.getMatch(id);
  }
}

export default MatchController;
