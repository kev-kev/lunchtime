import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, frame, health, scale }) {
    super(game, x, y, "bullet", frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(2);
    this.game = game;
    this.frame = 13;
    this.health = health;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }
}
