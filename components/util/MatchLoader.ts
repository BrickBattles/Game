import { Scene } from 'phaser';
import EventsCenter from './EventsCenter';
import Brick from '../game/sprites/brick';
import { Match } from '../../classes/match';
import * as matter from 'matter-js';

const matchLoader = (scene: Scene, match: Match) => {
  console.log(`loader: ${match}`);
  for (let key in match.players) {
    console.log(`key: ${key}`);
  }
  for (const [player_id, body] of Object.entries(match.players)) {
    console.log(`player: ${player_id}`);
    new Brick({
      scene: scene,
      x: body.position.x,
      y: body.position.y,
    });
  }
};

export default matchLoader;
