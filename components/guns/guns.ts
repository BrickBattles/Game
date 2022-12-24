import 'phaser';

class gun extends Phaser.Physics.Arcade.Sprite {
         
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        
        // this.scale = 3;
        
        this.animate();
        this.controls();        

        // this.scene.physics.add.existing(this);                
        this.setDepth(2);
        scene.add.existing(this);        
        // this.setCollideWorldBounds(true);
    }
    

    controls() {        
        const SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        

        SPACE.on('down', () => { this.play('shoot');});
        SPACE.on('up', () => { 
            this.stop();             
            this.setFrame(0);
        });        


    }

    animate() {
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('uzi', { start: 5, end: 9}),
            frameRate: 16,
            repeat: -1
        });
    } 
    
}


export default gun;