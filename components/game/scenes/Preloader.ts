import { Scene } from 'phaser';

export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }
    
    preload() {        
        // Load assets
        this.load.image('brick', 'textures/silver.png');   
        this.load.image('background', 'backgrounds/3.png');   
            
        this.load.spritesheet('uzi', 'guns/Spritesheets/uzi.png', 
            {frameWidth: 60, frameHeight: 40});

        this.load.image('bullet', 'guns/bullet_right.png');

    }
    
    create() {

        // Start main scene
        this.scene.start('mainscene');        
    }    
}