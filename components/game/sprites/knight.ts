import 'phaser';
import { Pathfinding } from './pathfinding';

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

    let pathfinding = new Pathfinding();

    // 480 x 800
    // 5 x 9

    let sol;
    if (this.x < 200) {
      // left tower
      sol = pathfinding.findPath(this.x, this.y, 120, 240);
    } else {
      // right tower
      sol = pathfinding.findPath(this.x, this.y, 360, 240);
    }
    // let sol = pathfinding.findPath(
    //   this.x,
    //   this.y,
    //   this.x < 200 ? 125 : 360,
    //   this.x < 200 ? 220 : 450
    // );

    console.log(`sol: ${JSON.stringify(sol)}`);

    let path = new Phaser.Curves.Path(this.x, this.y);

    Object.entries(sol).forEach(([key, value]: any) => {
      // console.log(`key: ${key}, value: ${JSON.stringify(value)}`);
      path.lineTo(value.x, value.y);
    });

    let graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0xff0000, 1);
    path.draw(graphics);

    let attack = this.scene.add.follower(path, this.x, this.y, 'knight');
    attack.startFollow({
      duration: 10000,
      repeat: 0,
    });
  }

  update() {}
}

export default Knight;
