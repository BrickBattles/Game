enum MatchState {
  WAITING_FOR_PLAYERS,
  STARTING,
  IN_PROGRESS,
  FINISHED,
}

class Match {
  id: string;
  streamId: string;
  players: Set<string>;
  state: MatchState;
  amount: number;

  constructor(id: string, streamId: string) {
    this.id = id;
    this.streamId = streamId;
    this.players = new Set();
    this.state = MatchState.WAITING_FOR_PLAYERS;
    this.amount = 0;
  }

  public hasPlayer(playerAddr: string) {
    return this.players.has(playerAddr);
  }
}

export { Match, MatchState };
