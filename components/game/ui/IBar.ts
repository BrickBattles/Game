import 'phaser';

class IBar extends Phaser.GameObjects.Graphics {
  id: string;
  val: number = 500; // 0 -> 1000 where val / 10 = amount of mana

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
    if (this.val < 1000) {
      this.val++;
    }
    this.fillStyle(0x8a2be2, 0.6);
    let val_w = this.w * (this.val / 1000) - 10;
    this.fillRect(this.orig_x + 5, this.orig_y + 5, val_w < 0 ? 0 : val_w, this.h - 10);
  }

  troopPlaced(cost: number) {
    this.val -= cost;

    // reset bar
    this.fillStyle(0xcccccc, 1);
    this.fillRect(this.orig_x, this.orig_y, this.w, this.h);
  }
}

export default IBar;
