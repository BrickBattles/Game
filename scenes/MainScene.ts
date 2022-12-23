import { Scene } from 'phaser';
import brick from '../components/bricks/brick';
export default class MainScene extends Scene {
    constructor() {
        super('mainscene');
    }
    
    preload() {        
        
    }
    
    create() {
        let { width, height } = this.sys.game.canvas;

        // set background
        let background = this.add.image(0,0,'background').setOrigin(0,0);
        background.displayWidth = width;
        background.displayHeight = height;
        

        
        
        let player_1 = new brick(this, 250, 250, 'brick');
        
        
        
    }
    
    update() {
        // Update scene        
        
    }
}