import { Scene } from 'phaser';
import brick from '../components/bricks/brick';
export default class MainScene extends Scene {
    constructor() {
        super('mainscene');
    }
    
    preload() {        
    }
    
    create() {
                                                
        let player_1 = new brick(this, 250, 250, 'brick');
        
        
        
    }
    
    update() {
        // Update scene        
        
    }
}