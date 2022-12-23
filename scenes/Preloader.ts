import { Scene } from 'phaser';

export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }
    
    preload() {
        // Load assets
        // this.load.image('brick', 'assets/brick.png');        
    }
    
    create() {
        // Create scene
        this.scene.start('testscene');
    }    
}