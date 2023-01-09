import { Scene } from 'phaser';
import brick from '../sprites/bricks/brick';
import { Player } from '../../../classes/player';
import { Match } from '../../../classes/match';
export default class MainScene extends Scene {
  player_sprite: any;
  enemy_sprite: any;

  player: Player = new Player();
  enemy: Player = new Player();

  socket: any;
  match_id: any;

  constructor() {
    super('mainscene');
  }

  init() {
    console.log('main scene ------------');
    console.log(`match id: ${this.match_id}`);
    console.log(`socket id: ${this.socket.id}`);
    this.player_sprite = new brick(this, 250, 250, 'brick', true);
    this.enemy_sprite = new brick(this, 450, 250, 'brick');

    this.socket.emit('get_match_data', this.match_id);
    this.socket.on('update_match_data', (match: Match) => {
      this.player = match.players[this.socket.id];
      console.log(`player: ${this.player.id}`);
      let other_player = Object.values(match.players).find((p) => p.id != this.player.id);
      if (other_player) {
        this.enemy = other_player;
        console.log(`enemy: ${this.enemy.id}`);
      }
    });
  }

  preload() {}

  create() {
    let { width, height } = this.sys.game.canvas;

    // set background
    let background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.displayWidth = width;
    background.displayHeight = height;

    // raise bottom collider
    this.physics.world.setBounds(0, 0, width, height * 0.75, true, true, true, true);

    this.player.x = this.player_sprite.x;
    this.player.y = this.player_sprite.y;

    this.socket.on('res_update_game', (match: Match) => {
      if (match) {
        console.log(`res update game ${JSON.stringify(match.players)}`);
        this.enemy = match.players[this.enemy.id];
        this.enemy_sprite.x = this.enemy.x;
        this.enemy_sprite.y = this.enemy.y;
      }
    });
  }

  update() {
    if (this.player.x != this.player_sprite.x || this.player.y != this.player_sprite.y) {
      this.player.x = this.player_sprite.x;
      this.player.y = this.player_sprite.y;
      this.socket.emit('req_update_game', this.match_id, this.player);
    }
  }
}
