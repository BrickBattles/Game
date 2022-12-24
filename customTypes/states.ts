export enum MatchState {
  NEW,
  WAITING_FOR_PLAYERS,
  READY,
  LOADING,
  IN_PROGRESS,
  STOPPING,
  FINISHED,
}

export const enum PlayerState {
  NEW,
  READY,
  IN_MATCH,
}
