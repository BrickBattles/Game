
import { useEffect, useState} from "react";
import {Game as GameType} from "phaser";

const Game = () => {
  const [ game, setGame ] = useState<GameType>();

  useEffect(() => {
    async function initPhaser() {

      const Phaser = await import("phaser");
      
      const { default: Preloader } = await import("../scenes/Preloader");
      const { default: MainScene } = await import("../scenes/MainScene");

      const PhaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1000,
        height: 500,
        backgroundColor: "#ffffff",
        parent: "game-content",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 200 },
            debug: true
          }
        },
        scene: [
            Preloader,
            MainScene
        ],
      });
      
      setGame(PhaserGame);      
    }
    initPhaser();
  }, []);

  return (
    <>
      <div id="game-content" key="game-content">
        {/* where the canvas will be rendered */}
      </div>

    </>
  )
};

export default Game;