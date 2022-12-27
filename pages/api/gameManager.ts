import { Player, PlayerState } from "../../classes/player";
import { Match, MatchState } from "../../classes/match";
import { v4 as uuid } from "uuid";

class GameManager {
  private static _instance: GameManager;
  private _matches: { [id: string]: Match } = {};
  private _players: { [id: string]: Player } = {};

  private constructor() {
    // private constructor
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get matches() {
    return this._matches;
  }

  public get players() {
    return this._players;
  }

  public createPlayer(player_id: string, address: string): boolean {
    if(this._players[player_id]) return false;
    this._players[player_id] = new Player(player_id, address);
    return true;
  }

  public createMatch(player_id: string): boolean {        
    if (!this._players[player_id]) return false;
    if (this._players[player_id].state != PlayerState.NOT_IN_MATCH) return false;
    
    const player = this._players[player_id];
    player.state = PlayerState.WAITING_FOR_PLAYERS;

    const match = new Match(uuid(), player);
    this._matches[match.id] = match;
    return true;
  }

  public removePlayer(id: string) {
    delete this._players[id];
  }

  public removeMatch(id: string) {
    delete this._matches[id];
  }

  public getMatchById(id: string) {
    return this._matches[id];
  }

  public getPlayerById(id: string) {
    return this._players[id];
  }

  public getMatchDataForTable() {
    const matches = Object.values(this._matches);
    const data = matches.map((match) => {
      return {
        id: match.id,
        players: match.players,        
        state: MatchState[match.state],
      };
    });
    return data;
  }

  // // returns opponent data from match
  // public getOpponentData(match_id: string, id: string) {    
    
  //   if (!this._matches[match_id]) return null;
  //   if (!this._players[id]) return null;

  //   const match = this._matches[match_id];
  //   const player = this._players[id];

  //   if (match.player.id == player.id) {
  //     return match.enemy
  //   }
  //   else if (match.enemy && match.enemy.id == player.id) {
  //     return match.player
  //   }

  //   return null;    
  // }

  public getMatchData(match_id: string) {
    if (!this._matches[match_id]) return null;    
    return this._matches[match_id] as Match;
  }

  public updatePlayer(match_id: string, p: Player): boolean {
    if (!this._matches[match_id]) return false;
    const match = this._matches[match_id];
    
    if (!match.players[p.id]) return false
    match.players[p.id] = p;

    return true;
  }

  public joinMatch(match_id: string, player_id: string): boolean {
  if (
    !this._matches[match_id] || // match doesn't exist
      !this._players[player_id] // player doesnt exist
    )
      return false;

    const match = this._matches[match_id];
    const p = this._players[player_id];

    if (
      match.state != MatchState.WAITING_FOR_PLAYERS || // match is not waiting for players
      p.state != PlayerState.NOT_IN_MATCH // player is already in a match
    )
      return false;

    match.addPlayer(p);
    match.state = MatchState.READY;
    console.log('joinMatch', this._matches[match_id].players);
    console.log('joinMatch', this._matches[match_id].players);

    return true;
  }
}

export default GameManager;
