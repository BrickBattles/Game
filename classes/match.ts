enum MatchState {
  WAITING_FOR_PLAYERS,
  IN_PROGRESS,
  FINISHED,
}

class Match {
  id: string;
  streamId: string;
  players: Map<string, string>;
  state: MatchState;
  amount: number;

  constructor(id: string, streamId: string) {
    this.id = id;
    this.streamId = streamId;
    this.players = new Map();
    this.state = MatchState.WAITING_FOR_PLAYERS;
    this.amount = 0;
  }
}

export { Match, MatchState };
