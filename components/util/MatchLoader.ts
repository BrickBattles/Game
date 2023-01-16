import { Scene } from 'phaser';
import EventsCenter from './EventsCenter';
import Brick from '../game/sprites/brick';
import { Match } from '../../classes/match';
import * as matter from 'matter-js';
import { MatchData } from '../../classes/matchData';

const LoadMatch = (scene: Scene, data: any, client_id: string) => {
  let match = JSON.parse(data);
  console.log(match);
  for (let key in match.players) {
    const player = match.players[key];

    new Brick({
      scene: scene,
      x: player.position.x,
      y: player.position.y,
      controls: player.id === client_id,
    });
  }
};

const SaveMatch = (scene: Scene, match_ref: MatchData) => {};

export { LoadMatch, SaveMatch };
