import 'phaser';

class IBar extends Phaser.GameObjects.Graphics {
  id: string;
  val: number = 100; // 0 -> 100 where val / 10 = amount of mana

  orig_x: number;
  orig_y: number;
  w: number;
  h: number;

  constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
    super(scene);
    // background of bar
    this.fillStyle(0xcccccc, 1);
    this.fillRect(x, y, w, h);

    this.orig_x = x;
    this.orig_y = y;
    this.w = w;
    this.h = h;

    scene.add.existing(this);
  }

  update() {
    this.fillStyle(0x8a2be2, 0.6);
    this.fillRect(this.orig_x + 5, this.orig_y + 5, this.w * (this.val / 100) - 10, this.h - 10);
  }
}

export default IBar;
