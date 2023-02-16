import { Scene } from 'phaser';

import Knight from '../sprites/knight';
import IBar from '../ui/IBar';
export default class MainScene extends Scene {
  streamId: string;
  matchId: string;
  streamr: any;
  mana: any;

  constructor() {
    super('mainscene');
  }

  init() {
    this.streamId = this.registry.get('streamId');
    this.matchId = this.registry.get('matchId');
    this.streamr = this.registry.get('streamr');
  }

  preload() {}

  create() {
    let bg = this.add.image(0, 0, 'map').setOrigin(0, 0);
    bg.setDepth(-1);

    this.mana = new IBar(this, 150, 750, 200, 50);

    this.input.on('pointerdown', (pointer: any) => {
      if (pointer.y < 440) return;
      if (this.mana.val < 200) return;
      this.mana.troopPlaced(200);
      new Knight({ scene: this, x: pointer.x, y: pointer.y });

      // this.streamr.publish(this.streamId, {
      //   action: 'place_troop',
      //   troop: {
      //     x: pointer.x,
      //     y: pointer.y,
      //   },
      // });
    });

    this.streamr.subscribe(this.streamId, (message: any) => {
      console.log(message);
      if (message.action === 'place_troop') {
        // let x = this.add.sprite(message.troop.x, message.troop.y, 'knight');
      }
    });
  }

  update() {
    this.mana.update();
  }
}
