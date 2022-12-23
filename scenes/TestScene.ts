import { Scene } from 'phaser';

export default class TestScene extends Scene {
    constructor() {
        super('testscene');
    }
    
    preload() {        
    }
    
    create() {
        
        
        // let x = new Phaser.GameObjects.Rectangle(this, 0, 0, 100, 50, 0xff0000);
        // this.add.existing(x);
        console.log('create')
        this.add.rectangle(0, 0, 100, 50, 0xff0000);
                        
    }
    
    update() {
        // Update scene        
        
    }
}