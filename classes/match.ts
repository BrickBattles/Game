import * as matter from 'matter-js';

export enum MatchState {
  NEW,
  INIT,
  IN_PROGRESS,
  STOPPING,
  FINISHED,
}

export class Match {
  public id: string;
  public players: { [player_id: string]: matter.Body } = {};
  public state: MatchState;

  constructor({ id, state = MatchState.NEW }: { id: string; state?: MatchState }) {
    this.id = id;
    this.state = state;
  }

  public addPlayer({
    id,
    player = matter.Bodies.rectangle(
      Object.keys(this.players).length > 0 ? 100 : 200,
      100,
      50,
      50
    ) as matter.Body,
  }: {
    id: string;
    player?: matter.Body;
  }) {
    this.players[id] = player;
  }

  public toJSON() {
    let playerJSON: { [id: string]: any } = {};
    for (let key in this.players) {
      let p = this.players[key];
      let t = {
        position: {
          x: p.position.x,
          y: p.position.y,
        },
      };
      playerJSON[key] = t;
    }
    return {
      id: this.id,
      players: playerJSON,
      state: this.state,
    };
  }
}

export class MatchStorage {
  public matches: { [match_id: string]: Match } = {};

  public getMatch(id: string): Match {
    return this.matches[id];
  }
  public hasMatch(id: string): boolean {
    return !!this.matches[id];
  }

  public addMatch(match: Match) {
    this.matches[match.id] = match;
  }

  public removeMatch(id: string) {
    delete this.matches[id];
  }
}
