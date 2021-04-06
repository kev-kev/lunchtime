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
    this.load.spritesheet("xBorder", "assets/images/borders.png", 48, 16);
    this.load.spritesheet(
      "cBorder",
      "assets/images/borders.png",
      16,
      16,
      -1,
      0,
      0,
      4
    );
    this.load.spritesheet(
      "yBorder",
      "assets/images/borders.png",
      16,
      48,
      -1,
      0,
      0,
      3
    );
  }

  create() {
    this.state.start("Game");
  }
}
