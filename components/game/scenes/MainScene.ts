import { Scene } from 'phaser';
import EventsCenter from '../../util/EventsCenter';
import Brick from '../sprites/brick';
export default class MainScene extends Scene {
  player_sprite: Brick;
  id: string;

  constructor() {
    super('mainscene');
  }

  init() {
    this.id = this.registry.get('id');
  }

  preload() {}

  create() {
    // console.log(this.matter.world);

    EventsCenter.on('initialize', (data: any) => {
      console.log('here');
      this.player_sprite = new Brick({
        scene: this,
        x: 100,
        y: 100,
        controls: true,
      });
    });

    // worl settings
    this.matter.world.setGravity(0, 0.8);
    this.matter.world.setBounds();

    // tell server to start game
    fetch(`/api/match/${this.id}`);
  }

  update() {}
}
