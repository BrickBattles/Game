import 'phaser';

class brick extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        
        this.scene.physics.add.existing(this);                
        scene.add.existing(this);
        
        this.setCollideWorldBounds(true);
    }
    
    
}


export default brick;