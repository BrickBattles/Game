import 'phaser';

class Knight extends Phaser.Physics.Matter.Sprite {
  health: number = 100;
  id: string;

  constructor({
    scene,
    x,
    y,
    texture = 'knight',
    frame,
    options,
  }: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture?: string;
    frame?: string;
    options?: any;
  }) {
    super(scene.matter.world, x, y, texture, frame, options);

    this.setScale(0.25);
    scene.add.existing(this);
  }

  create() {
    // tween move to tower
  }

  update() {}
}

export default Knight;
