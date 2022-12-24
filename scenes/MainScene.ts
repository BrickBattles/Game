import { Scene } from 'phaser';
import brick from '../components/bricks/brick';
import gun from '../components/guns/guns';
export default class MainScene extends Scene {
    
    players: brick[] = [];

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

        // raise bottom collider
        this.physics.world.setBounds(0, 0, width, (height * 0.75), true, true, true, true);

        let player_1 = new brick(this, 250, 250, 'brick');
        this.players.push(player_1);
                    
    }
    
    update() {
        // Update scene        
        this.players.forEach(player => player.update());        
    }
}