import Phaser from "phaser";
import { centerGameObjects } from "../utils";

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "loaderBg"
    );
    this.loaderBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "loaderBar"
    );

    // this.physics.setBounds()

    centerGameObjects([this.loaderBg, this.loaderBar]);
    this.load.setPreloadSprite(this.loaderBar);
    this.load.spritesheet(
      "bullet",
      "assets/images/Shooter_SpriteSheet.png",
      16.3,
      16.5
    );
    this.load.spritesheet("player", "assets/images/panda.png", 32, 32);
    this.load.spritesheet("pumpkin", "assets/images/pumpkin.png", 32, 32);
  }

  create() {
    this.state.start("Game");
  }
}
