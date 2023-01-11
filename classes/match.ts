export class Player {
  public id: string;
  public x: any;
  public y: any;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

export enum MatchState {
  NEW,
  INIT,
  IN_PROGRESS,
  STOPPING,
  FINISHED,
}

export class Match {
  public id: string;
  public players: { [player_id: string]: Player } = {};
  public state: MatchState;

  constructor({ id, state = MatchState.NEW }: { id: string; state?: MatchState }) {
    this.id = id;
    this.state = state;
  }
}
