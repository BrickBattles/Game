import "phaser";
import { Physics } from "phaser";
class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.setDepth(1);
    scene.add.existing(this);
  }
  fire(x: number, y: number, v: number) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(v);
   
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.y <= -32) {
      this.setActive(false);
      this.setVisible(false);
    }      
  }

}
class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 100,
      key: "bullet",
      active: false,
      visible: false,
      classType: Bullet,
      setScale: { x: 0.1, y: 0.1 },
    });
  }

  fireBullet(x: number, y: number, v: number) {
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.body.allowGravity = false;
      bullet.body.immovable = true;
      bullet.fire(x, y, v);
    }
  }
}
class Gun extends Phaser.Physics.Arcade.Sprite {
  bullets: BulletGroup;
  direction: boolean; // true = right, false = left (if flipped)
    
  shoot: boolean;
  cooldown: number;  // controls rate of fire
  prevShot: number;
  v: number; // controls speed of bullet

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // this.scale = 3;
    this.animate();
    this.controls();

    this.setDepth(2);
    scene.add.existing(this);
    this.bullets = new BulletGroup(this.scene);

    this.shoot = false;
    this.cooldown = 100;
    this.prevShot = 0;
    
    this.v = 500;
  }

  controls() {
    const SPACE = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    SPACE.on("down", () => {
      this.play("shoot");
      this.shoot = true;
    });
    SPACE.on("up", () => {
      this.stop();
      this.setFrame(0);
      this.shoot = false;
    });
  }

  animate() {
    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers("uzi", { start: 5, end: 9 }),
      frameRate: 16,
      repeat: -1,
    });
  }

  update() {
    
      if (this.shoot && this.scene.time.now - this.prevShot > this.cooldown) {
        this.prevShot = this.scene.time.now;
        this.bullets.fireBullet(this.x, this.y, (this.flipX) ? this.v : -this.v);
      }
    
  }
}

export default Gun;
