import 'phaser';

class brick extends Phaser.GameObjects.Sprite {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame);
        
        this.setTexture('brick_texture');

        // this.visible = true;
        // this.active = true;
        
        // this.scene.physics.add.existing(this);
        // this.setDepth(1);
        // scene.add.existing(this);
    }
    
    
}


export default brick;