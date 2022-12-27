
import { useEffect, useState} from "react";
import {Game as GameType} from "phaser";

import { NextPage } from "next";
import { Socket } from "socket.io-client";

const Game: NextPage<{matchID:string, socket: Socket}> = (
  matchID,
  socket
) => {
  
  useEffect(() => {
    async function initPhaser() {

      const Phaser = await import("phaser");
      
      const { default: Preloader } = await import("./scenes/Preloader");
      const { default: MainScene } = await import("./scenes/MainScene");

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
            MainScene
        ],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,    
          width: 700,
          height: 400,
        },
        
      });
      
      PhaserGame.registry.set("match_id", matchID.matchID);
      PhaserGame.registry.set("socket", matchID.socket);
      // PhaserGame.scene.start("Preloader", {matchID: matchID.matchID, socket: socket.socket});      
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