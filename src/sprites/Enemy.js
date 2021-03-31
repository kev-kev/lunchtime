import Phaser from "phaser";
import Bullet from "./Bullet";

const DIAGONAL_TOLERANCE = 0.8; // higher = stickier up/down movement animation

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame, health }) {
    super(game, x, y, asset, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(2);
    this.game = game;
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.health = 12;
    this.maxHealth = 12;
    this.addAnimations();
  }

  addAnimations() {
    this.animations.add("turnLeft", [4], 1);
    this.animations.add("turnRight", [7], 1);
    this.animations.add("turnUp", [10], 1);
    this.animations.add("turnDown", [1], 1);
    this.animations.add("moveLeft", [3, 4, 5], 5);
    this.animations.add("moveRight", [6, 7, 8], 5);
    this.animations.add("moveUp", [9, 10, 11], 5);
    this.animations.add("moveDown", [0, 1, 2], 5);
  }

  update() {
    this.listenForMove();
    this.body.setSize(25, 32, 4);
    this.body.collideWorldBounds = true;
  }

  listenForMove() {
    if (this.body.deltaY() > 0) {
      this.setDiagonalMovement("moveDown");
    } else if (this.body.deltaY() < 0) {
      this.setDiagonalMovement("moveUp");
    }
  }

  setDiagonalMovement(verticalMovement) {
    if (
      this.body.deltaX() > -DIAGONAL_TOLERANCE &&
      this.body.deltaX() < DIAGONAL_TOLERANCE
    ) {
      this.animations.play(verticalMovement);
    } else if (this.body.deltaX() > 0) {
      this.animations.play("moveRight");
    } else if (this.body.deltaX() < 0) {
      this.animations.play("moveLeft");
    }
  }
}
