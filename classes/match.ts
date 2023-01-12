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
    let player_arr = [];
    for (let key in this.players) {
      player_arr.push({
        id: key,
        x: this.players[key].position.x,
        y: this.players[key].position.y,
      });
    }

    return {
      match_id: this.id,
      state: this.state,
      players: player_arr,
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

  public toJSON() {
    return Object.values(this.matches);
  }
}
