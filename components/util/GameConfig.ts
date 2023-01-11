import Phaser from 'phaser';

import Preloader from '../game/scenes/Preloader';
import MainScene from '../game/scenes/MainScene';

const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  backgroundColor: '#ffffff',
  parent: 'game-content',
  pixelArt: true,
  physics: {
    default: 'matter',
    matter: {
      debug: true,
    },
  },
  scene: [Preloader, MainScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 700,
    height: 400,
  },
};

export default GameConfig;
