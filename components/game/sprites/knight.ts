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
    scene.add.existing(this);

    // tween move to tower
    console.log('here');
    let path = new Phaser.Curves.Path(this.x, this.y);

    if (this.x < 200) {
      // left tower
      path.lineTo(125, 450);
      path.lineTo(125, 220);
    } else {
      //right tower
      path.lineTo(360, 450);
      path.lineTo(360, 220);
    }

    let graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0xffffff, 1);
    path.draw(graphics);

    let attack = this.scene.add.follower(path, this.x, this.y, 'knight');
    attack.startFollow({
      duration: 10000,
      repeat: 0,
    });
  }

  update() {
    console.log('update');
  }
}

export default Knight;
