import "pixi";
import "p2";
import Phaser from "phaser";

import BootState from "./states/Boot";
import SplashState from "./states/Splash";
import GameState from "./states/Game";

import config from "./config";

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;

    // When game starts up, calculate the width and height of the game window based on config or
    // the window height.
    const width =
      docElement.clientWidth > config.gameWidth
        ? config.gameWidth
        : docElement.clientWidth;
    const height =
      docElement.clientHeight > config.gameHeight
        ? config.gameHeight
        : docElement.clientHeight;

    const gameConfig = {
      renderer: Phaser.CANVAS,
      width: width,
      height: height,
      physicsConfig: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      parent: "content",
    };

    super(gameConfig);

    this.state.add("Boot", BootState, false);
    this.state.add("Splash", SplashState, false);
    this.state.add("Game", GameState, false);

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start("Boot");
    }
  }
}

window.game = new Game();

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        "deviceready",
        this.onDeviceReady.bind(this),
        false
      );
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent("deviceready");

      // When the device is ready, start Phaser Boot state.
      window.game.state.start("Boot");
    },

    receivedEvent: function (id) {
      console.log("Received Event: " + id);
    },
  };

  app.initialize();
}

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }
