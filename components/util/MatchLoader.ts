import { Scene } from 'phaser';
import EventsCenter from './EventsCenter';
import Brick from '../game/sprites/brick';
import { Match } from '../../classes/match';
import * as matter from 'matter-js';

const matchLoader = (scene: Scene, data: any) => {
  let match = JSON.parse(data);
  for (let key in match.players) {
    const body = match.players[key];
    new Brick({
      scene: scene,
      x: body.position.x,
      y: body.position.y,
    });
  }
};

export default matchLoader;
