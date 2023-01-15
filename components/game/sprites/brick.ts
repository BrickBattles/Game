import 'phaser';
import gun from './guns';
import EventsCenter from '../../util/EventsCenter';
class Brick extends Phaser.Physics.Matter.Sprite {
  brickGun: gun;
  health: number = 100;

  constructor({
    scene,
    x = 0,
    y = 0,
    texture = 'brick',
    frame,
    options,
    controls = false,
  }: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture?: string;
    frame?: string;
    options?: any;
    controls?: boolean;
  }) {
    super(scene.matter.world, x, y, texture, frame, options);

    if (controls) this.controls();

    scene.add.existing(this);
  }

  controls() {
    // const UP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    // const DOWN = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    const LEFT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    const RIGHT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    LEFT.on('down', () => {
      this.setVelocityX(-100);
      // this.brickGun.flipX = false;
    });
    LEFT.on('up', () => {
      this.setVelocityX(0);
    });

    RIGHT.on('down', () => {
      this.setVelocityX(100);
      // this.brickGun.flipX = true;
    });
    RIGHT.on('up', () => {
      this.setVelocityX(0);
    });
    // UP.on('down', () => { this.setVelocityY(-100); });
    // DOWN.on('down', () => { this.setVelocityY(100); });
  }

  update() {
    // this.brickGun.update();
    // this.brickGun.x = this.x;
    // this.brickGun.y = this.y;
  }
}

export default Brick;
