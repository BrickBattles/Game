import { Scene } from 'phaser';

export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }
    
    preload() {
        // Load assets
        this.load.image('brick', 'textures/brick.png');    
       
        
        
    }
    
    create() {
        this.physics.world.on('worldbounds', function(body: any) {
            console.log('worldbounds');
        }); 
        // Create scene
        this.scene.start('mainscene');
    }    
}