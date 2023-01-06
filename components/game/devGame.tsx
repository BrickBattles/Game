
import { useEffect, useState} from "react";
import {Game as GameType} from "phaser";

import { NextPage } from "next";
import { Socket } from "socket.io-client";

const Game: NextPage = () => {
  
  useEffect(() => {
    async function initPhaser() {

      const Phaser = await import("phaser");
      
      const { default: Preloader } = await import("./scenes/Preloader");
      const { default: DebugScene } = await import("./scenes/DevScene");

      const PhaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      width: 1000,
        height: 500,
        backgroundColor: "#ffffff",
        parent: "game-content",
        pixelArt: true,
        physics: { 
          default: "arcade",
          arcade: {
            gravity: { y: 200 },
            debug: true
          }
        },
        scene: [
            Preloader, 
            DebugScene
        ],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,    
          width: 700,
          height: 400,
        },
        
      });
      PhaserGame.scene.start("Preloader"); 
    }
    

    initPhaser();
  }, []);

  return (
    <>
      <div id="game-content" key="game-content" className="block">
        {/* where the canvas will be rendered */}
      </div>

    </>
  )
};

export default Game;