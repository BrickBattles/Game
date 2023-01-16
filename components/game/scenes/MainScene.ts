import { Scene } from 'phaser';
import EventsCenter from '../../util/EventsCenter';
import Brick from '../sprites/brick';
import { Match } from '../../../classes/match';
import matchLoader from '../../util/MatchLoader';
export default class MainScene extends Scene {
  player_sprite: Brick;
  id: string;
  clientId: string;

  constructor() {
    super('mainscene');
  }

  init() {
    this.id = this.registry.get('id');
    this.clientId = this.registry.get('clientId');
  }

  preload() {}

  create() {
    // console.log(this.matter.world);

    EventsCenter.on('initialize', (data: any) => {
      matchLoader(this, data, this.clientId);
    });

    // worl settings
    this.matter.world.setGravity(0, 0.8);
    this.matter.world.setBounds();

    // tell server to start game
    fetch(`/api/match/${this.id}`);
  }

  update() {}
}
