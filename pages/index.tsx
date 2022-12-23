
import { useEffect, useState} from "react";
import {Game as GameType} from "phaser";

const Game = () => {
  const [ game, setGame ] = useState<GameType>();

  useEffect(() => {
    async function initPhaser() {

      const Phaser = await import("phaser");
      
      const { default: Preloader } = await import("../scenes/Preloader");
      const { default: TestScene } = await import("../scenes/TestScene");

      const PhaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        width: 500,
        height: 200,
        backgroundColor: "#ffffff",
        parent: "game-content",
        scene: [
            Preloader,
            TestScene
        ]
      });
      console.log('effect')
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