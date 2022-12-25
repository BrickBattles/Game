import {Player} from "./player";

export enum MatchState {  
  WAITING_FOR_PLAYERS,
  READY,
  LOADING,
  IN_PROGRESS,
  STOPPING,
  FINISHED,
}

export class Match {
  public id: string;
  public player: Player;
  public enemy!: Player;
  public state: MatchState;

  constructor(
    id: string,
    createdBy: Player,
    state: MatchState = MatchState.WAITING_FOR_PLAYERS
  ) {
    this.id = id;
    this.state = state;
    this.player = createdBy;
  }

  public addPlayer(player: Player) {
    if (this.state == MatchState.WAITING_FOR_PLAYERS) {
      this.enemy = player;
      this.state = MatchState.READY;
    }
  }

}
