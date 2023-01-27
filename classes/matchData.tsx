type CordData = {
  x: number;
  y: number;
};

export class PlayerData {
  public id: string;
  public position: CordData;
  public velocity: CordData;
  public acceleration: CordData;

  public constructor(id: string) {
    this.id = id;
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
  }
}

export class MatchData {
  public id: string;
  public players: { [key: string]: PlayerData };

  constructor(id: string) {
    this.id = id;
  }

  public addPlayer(player: PlayerData) {
    this.players[player.id] = player;
  }
}

export class MatchDataStorage {
  public matches: { [match_id: string]: MatchData } = {};

  public getMatch(id: string): MatchData {
    return this.matches[id];
  }
  public hasMatch(id: string): boolean {
    return !!this.matches[id];
  }

  public addMatch(match: MatchData) {
    this.matches[match.id] = match;
  }

  public removeMatch(id: string) {
    delete this.matches[id];
  }
}
