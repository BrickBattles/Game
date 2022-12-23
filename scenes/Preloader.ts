import { Scene } from 'phaser';

export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }
    
    preload() {        
        // Load assets
        this.load.image('brick', 'textures/silver.png');   
        this.load.image('background', 'backgrounds/2.png');                        
    }
    
    create() {

        // Start main scene
        this.scene.start('mainscene');        
    }    
}