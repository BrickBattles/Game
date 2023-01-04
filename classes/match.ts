import {Player, PlayerState} from "./player";

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
  public players: {[player_id: string]: Player} = {};  
  public state: MatchState;

  constructor(
    id: string,
    createdBy: Player,
    state: MatchState = MatchState.WAITING_FOR_PLAYERS
  ) {
    this.id = id;
    this.players[createdBy.id] = createdBy;
    this.state = state;
  }

  public addPlayer(p2: Player) {    
    if (
      this.state == MatchState.WAITING_FOR_PLAYERS &&
      !this.players[p2.id] && 
      p2.state == PlayerState.NOT_IN_MATCH &&
      Object.keys(this.players).length < 2
      ) {
      this.players[p2.id] = p2;
      this.state = MatchState.READY;
    } else {
      console.log('Match.addPlayer: invalid state', this.state, this.players[p2.id], Object.keys(this.players).length < 2);
    }
  }

}
