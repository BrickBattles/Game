import { Scene } from 'phaser';
import EventsCenter from '../../util/EventsCenter';
export default class DevScene extends Scene {
  player_sprite: any;

  constructor() {
    super('mainscene');
  }

  init() {}

  preload() {}

  create() {
    EventsCenter.on('sprite', (data: any) => {
      console.log(`sprite event ${JSON.stringify(data)}`);
      // this.matter.add.sprite(data.x, data.y, 'brick');
      var ball = this.matter.add.image(
        Phaser.Math.Between(32, 768),
        -200,
        'brick',
        Phaser.Math.Between(0, 5)
      );
    });

    fetch('/api/match/1');
  }

  update() {}
}
