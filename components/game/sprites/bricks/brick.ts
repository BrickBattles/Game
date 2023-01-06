import 'phaser';
import gun from '../guns/guns';
class brick extends Phaser.Physics.Arcade.Sprite {
    
    brickGun: gun ;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, controls: boolean=false) {
        super(scene, x, y, texture);
        
        this.scaleX = 0.8;
        this.scaleY = 0.4;
        // add controls
        if (controls) {
            this.controls();
        }

        this.brickGun = new gun(this.scene, this.x , this.y, 'uzi');    

        this.setDepth(1);

        this.scene.physics.add.existing(this);                
        scene.add.existing(this);        
        this.setCollideWorldBounds(true);
    }
    
    controls() {
        
        // const UP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // const DOWN = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const LEFT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const RIGHT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        LEFT.on('down', () => { 
            this.setVelocityX(-100); 
            this.flip()
        });
        LEFT.on('up', () => { this.setVelocityX(0); });

        RIGHT.on('down', () => { 
            this.setVelocityX(100); 
            this.flip()

        });
        RIGHT.on('up', () => { this.setVelocityX(0); });
        // UP.on('down', () => { this.setVelocityY(-100); });
        // DOWN.on('down', () => { this.setVelocityY(100); });
    }

    flip() {
        this.brickGun.flipX = !this.brickGun.flipX;
        this.brickGun.direction = !this.brickGun.direction;
    }
    
    update() {
        this.brickGun.update();
        this.brickGun.x = this.x;
        this.brickGun.y = this.y;
    }
    
}


export default brick;