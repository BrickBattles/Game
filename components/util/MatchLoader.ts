import { Scene } from 'phaser';
import EventsCenter from './EventsCenter';
import Brick from '../game/sprites/brick';

import * as matter from 'matter-js';

// const LoadMatch = (scene: Scene, data: any, client_id: string) => {
//   let match = JSON.parse(data);
//   console.log(match);
//   for (let key in match.players) {
//     const player = match.players[key];

//     new Brick({
//       scene: scene,
//       x: player.position.x,
//       y: player.position.y,
//       controls: player.id === client_id,
//       id: player.id,
//     });
//   }
// };

// const SaveMatch = (scene: Scene, match_ref: MatchData) => {
//   let players: any = {};

//   scene.children.each((child: any) => {
//     if (child instanceof Brick) {
//       players[child.id] = {
//         id: child.id,
//         position: child.body.position,
//       };
//     }
//   });

//   match_ref.players = players;
// };

// export { LoadMatch, SaveMatch };
