import { Scene } from 'phaser';
import EventsCenter from '../../util/EventsCenter';
import StreamrClient from 'streamr-client';
import { useEffect } from 'react';
export default class MainScene extends Scene {
  streamId: string;
  matchId: string;
  streamr: any;

  constructor() {
    super('mainscene');
  }

  init() {
    this.streamId = this.registry.get('streamId');
    this.matchId = this.registry.get('matchId');
    this.streamr = new StreamrClient({
      logLevel: 'debug',
    });
  }

  preload() {}

  create() {
    let bg = this.add.image(0, 0, 'map').setOrigin(0, 0);
    bg.setDepth(-1);
    bg.setScale(0.75);

    this.input.on('pointerdown', (pointer: any) => {
      let x = this.add.sprite(pointer.x, pointer.y, 'knight');
      x.setScale(0.25);

      this.streamr.publish(this.streamId, {
        action: 'place_troop',
        troop: {
          x: pointer.x,
          y: pointer.y,
        },
      });
    });

    this.streamr.subscribe(this.streamId, (message: any) => {
      console.log(message);
      if (message.action === 'place_troop') {
        let x = this.add.sprite(message.troop.x, message.troop.y, 'knight');
        x.setScale(0.25);
      }
    });
  }

  update() {}
}
