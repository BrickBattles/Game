import 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
        
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        
        this.scaleX = 0.8;
        this.scaleY = 0.4;
        
        this.setDepth(1);

        this.scene.physics.add.existing(this);                
        scene.add.existing(this);        
        this.setCollideWorldBounds(true);
    }
            
}

class BulletGroup extends Phaser.Physics.Arcade.Group {
    
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 10,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet 
        });        
    }
    
    fireBullet(x: number, y: number) {
        const bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.fire(x, y);
        }
    }    
}

export default BulletGroup;