import { Scene } from 'phaser';
import EventsCenter from '../../util/EventsCenter';
import Brick from '../sprites/brick';
import { Match } from '../../../classes/match';
import matchLoader from '../../util/MatchLoader';
export default class MainScene extends Scene {
  player_sprite: Brick;
  id: string;

  constructor() {
    super('mainscene');
  }

  init() {
    this.id = this.registry.get('id');
  }

  preload() {}

  create() {
    // console.log(this.matter.world);

    EventsCenter.on('initialize', (data: any) => {
      console.log(`initialize: ${data}`);
      // matchLoader(this, match);
      // for (let key in match.players) {
      //   console.log(`key: ${key}`);
      // }

      // for (const [player_id, body] of Object.entries(match.players)) {
      //   console.log(`player: ${player_id}`);
      //   new Brick({
      //     scene: this,
      //     x: body.position.x,
      //     y: body.position.y,
      //   });
      // }
    });

    // worl settings
    this.matter.world.setGravity(0, 0.8);
    this.matter.world.setBounds();

    // tell server to start game
    fetch(`/api/match/${this.id}`);
  }

  update() {}
}
