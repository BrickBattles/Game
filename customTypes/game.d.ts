import { MatchState, PlayerState } from "./states";

export type Match = {
  id: string;
  players: Array<Player>;
  state: MatchState;
};

export type Player = {
  address: string;
  data: any;
  state: PlayerState;
};
