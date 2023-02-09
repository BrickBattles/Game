import Phaser from 'phaser';

import Preloader from '../game/scenes/Preloader';
import MainScene from '../game/scenes/MainScene';

const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
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
    width: 500,
    height: 800,
  },
};

export default GameConfig;
