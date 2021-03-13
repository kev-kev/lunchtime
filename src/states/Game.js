/* globals __DEV__ */
import Phaser from "phaser";
import Mushroom from "../sprites/Mushroom";
import Panda from "../sprites/Panda";

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    const bannerText = "hoiiiiiiiiiiiiiiii";
    let banner = this.add.text(
      this.world.centerX,
      this.game.height - 80,
      bannerText,
      {
        font: "40px Bangers",
        fill: "#77BFA3",
        smoothed: false,
      }
    );

    banner.padding.set(10, 16);
    banner.anchor.setTo(0.5);

    this.sky = this.add.sprite(0, 0, "sky");

    this.panda = new Panda({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY + 100,
      asset: "panda",
      scale: 3,
    });

    this.game.add.existing(this.panda);
    this.game.physics.arcade.enable(this.panda);
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32);
      // this.game.debug.spriteInfo(this.panda, 32, 32);
    }
  }
}
