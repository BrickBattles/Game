import { Scene } from 'phaser';
import brick from '../components/bricks/brick';
export default class MainScene extends Scene {
    constructor() {
        super('mainscene');
    }
    
    preload() {        
    }
    
    create() {
        let sanity = new Phaser.GameObjects.Rectangle(this, 0, 0, 100, 50, 0xff0000);
        this.add.existing(sanity);        
        // this.physics.add.existing(x);     
        

        let player_1 = new brick(this, 250, 250, 'brick_texture', 'brick_frame');
        this.add.existing(player_1);
        
    }
    
    update() {
        // Update scene        
        
    }
}