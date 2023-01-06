import { Physics, Scene } from "phaser";
import brick from "../sprites/bricks/brick";
import gun from "../sprites/guns/guns";
import { Socket } from "socket.io-client";
import { Player } from "../../../classes/player";
import { Match } from "../../../classes/match";
export default class DevScene extends Scene {
  player_sprite: any;
  player: Player = new Player();  

  constructor() {
    super("mainscene");
  }

  init() {    
    console.log('main scene ------------')    
    this.player_sprite = new brick(this, 250, 250, "brick", true);
  }

  preload() {}

  create() {
    let { width, height } = this.sys.game.canvas;

    // set background
    let background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.displayWidth = width;
    background.displayHeight = height;

    // raise bottom collider
    this.physics.world.setBounds(
      0,
      0,
      width,
      height * 0.75,
      true,
      true,
      true,
      true
    );
    
    this.player.x = this.player_sprite.x;
    this.player.y = this.player_sprite.y;

   
  }

  update() {

  }
}
