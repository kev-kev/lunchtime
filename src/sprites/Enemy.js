import Phaser from "phaser";
import Bullet from "./Bullet";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame, health }) {
    super(game, x, y, asset, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(3);
    this.game = game;
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.health = health;
    this.maxHealth = health;
    this.animations.add("turnLeft", [4], 1);
    this.animations.add("turnRight", [7], 1);
    this.animations.add("turnUp", [10], 1);
    this.animations.add("turnDown", [1], 1);
    this.animations.add("left", [3, 4, 5], 10);
    this.animations.add("right", [6, 7, 8], 10);
    this.animations.add("up", [9, 10, 11], 10);
    this.animations.add("down", [0, 1, 2], 10);
  }
}
