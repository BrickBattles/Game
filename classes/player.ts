export const enum PlayerState {
  NOT_IN_MATCH,  
  WAITING_FOR_PLAYERS,
  IN_MATCH,
}

export class Player {
  public id: string;
  public name: string;
  public address: string;
  public x: any;
  public y: any;
  public state: PlayerState;

  constructor(
    id: string = '123',
    name: string = 'PlayerName',
    address: string = '0x00',
    x: number = 0,
    y: number = 0,
    state: PlayerState = PlayerState.NOT_IN_MATCH
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.x = x;
    this.y = y;
    this.state = state;
  }
}