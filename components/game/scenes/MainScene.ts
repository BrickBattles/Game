import { Physics, Scene } from "phaser";
import brick from "../sprites/bricks/brick";
import gun from "../sprites/guns/guns";
import { Socket } from "socket.io-client";
import { Player } from "../../../classes/player";
import { Match } from "../../../classes/match";
export default class MainScene extends Scene {
  player_sprite: any;
  enemy_sprite: any;

  player: Player = new Player();
  enemy: Player = new Player();

  socket: any;
  match_id: any;

  constructor() {
    super("mainscene");    
  }

  init(){    
    this.match_id = this.registry.get("match_id");
    this.socket = this.registry.get("socket");

    this.player_sprite = new brick(this, 250, 250, "brick");
    this.enemy_sprite = new brick(this, 450, 250, "brick");

    this.socket.emit("get_match_data", this.match_id);
    this.socket.on("update_match_data", (match: Match) => {    
      console.log(match.players)  
      this.player = match.players[this.socket.id];
      let other_player = Object.values(match.players).find(p => p.id != this.player.id);
      if(other_player) {
        this.enemy = other_player;
      }
    });

  }

  preload() {}

  create() {    
    let { width, height } = this.sys.game.canvas;

    // set background
    let background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.displayWidth = width;
    background.displayHeight = height;

    // raise bottom collider
    this.physics.world.setBounds(0,0,width,height * 0.75,true,true,true,true);
    
  }

  update() {
    
  }
}
