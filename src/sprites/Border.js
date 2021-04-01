import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.scale.setTo(2);
    this.game = game;
  }

  update() {
    this.body.immovable = true;
    // this.body.bounce = 1;
  }
}
