import { Physics, Scene } from "phaser";
import brick from "../sprites/bricks/brick";
import gun from "../sprites/guns/guns";
import { Socket } from "socket.io-client";
import { Player } from "../../../classes/player";
export default class MainScene extends Scene {
  player_sprite: any;
  enemy_sprite: any;

  player: Player = new Player();
  enemy: Player = new Player();

  socket: any;
  match_id: any;

  constructor() {
    super("mainscene");

    // let x = new brick(this, 0, 0, "brick");
    // this.player_sprite = new brick(this, 0, 0, "brick");
    // this.enemy_sprite = new brick(this, 0, 0, "brick");

    // this.socket = this.registry.get("socket");
    // this.match_id = this.registry.get("match_id");
  }
  init(){
    this.player = this.registry.get("player");
    this.socket = this.registry.get("socket");
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
    
    this.player_sprite = new brick(this, 250, 250, "brick");
    this.enemy_sprite = new brick(this, 250, 250, "brick");
    
    //     this.socket.on("res_update_game", (updated_enemy: Player) => {
    //     this.enemy = updated_enemy;
    //   });
  }

  update() {
    // Update enemy
    // this.enemy_sprite.setPosition(this.enemy.x, this.enemy.y);

    // this.registry
    //   .get("socket")
    //   .emit("req_update_game", this.registry.get("player_id"));
  }
}
