import Phaser from "phaser";
import WebFont from "webfontloader";
import config from "../config";

export default class extends Phaser.State {
  init() {
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload() {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts,
        },
        active: this.fontsLoaded,
      });
    }

    let text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      "loading fonts",
      { font: "16px Arial", fill: "#dddddd", align: "center" }
    );
    text.anchor.setTo(0.5, 0.5);

    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("loaderBar", "./assets/images/loader-bar.png");
    this.load.image("loaderBg", "./assets/images/loader-bg.png");
  }

  render() {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start("Splash");
    }
    if (!config.webfonts.length) {
      this.state.start("Splash");
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }
}
