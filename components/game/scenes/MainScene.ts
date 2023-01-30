import { Scene } from 'phaser';
import EventsCenter from '../../util/EventsCenter';
import Brick from '../sprites/brick';
import { MatchData } from '../../../classes/matchData';
import { SaveMatch, LoadMatch } from '../../util/MatchLoader';
export default class MainScene extends Scene {
  player_sprite: Brick;
  streamId: string;
  matchId: string;

  match: MatchData;

  constructor() {
    super('mainscene');
  }

  init() {
    this.streamId = this.registry.get('streamId');
    this.matchId = this.registry.get('matchId');
  }

  preload() {}

  create() {
    // console.log(this.matter.world);
    // EventsCenter.on('initialize', (data: any) => {
    //   LoadMatch(this, data, this.clientId);
    // });
    // worl settings
    // this.matter.world.setGravity(0, 0.8);
    // this.matter.world.setBounds();
    // tell server to start game
    // fetch(`/api/match/${this.streamId}`);
    // this.input.keyboard.on('keydown', () => {
    //   // SaveMatch(this, this.match);
    //   EventsCenter.emit('update_match', this.match);
    // });
  }

  update() {}
}
