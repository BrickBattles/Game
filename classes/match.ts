enum MatchState {
  WAITING_FOR_PLAYERS,
  STARTING,
  IN_PROGRESS,
  FINISHED,
}

class Match {
  id: string;
  streamId: string;
  players: Set<string> = new Set();
  state: MatchState = MatchState.WAITING_FOR_PLAYERS;
  amount: number = 0;

  constructor(id: string, streamId: string) {
    this.id = id;
    this.streamId = streamId;
  }
}

export { Match, MatchState };
