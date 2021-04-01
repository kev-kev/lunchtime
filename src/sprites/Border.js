import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, "border");
    this.scale.setTo(2);
    this.game = game;
  }
}
