import { MatchState, PlayerState } from "./states";

export type Player = {
  id: string;
  address: string;
  data: any;
  state: PlayerState;
};
export type PlayerStorage = { [key: string]: Player };

export type Match = {
  id: string;
  playerData: PlayerStorage;
  state: MatchState;
};
export type MatchStorage = { [key: string]: Match };
