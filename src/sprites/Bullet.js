import Phaser from "phaser";

const bulletSpeed = 250;

export default class extends Phaser.Sprite {
  constructor({ game, x, y, frame, health }) {
    super(game, x, y, "bullet", frame);
    this.anchor.setTo(0.5);
    this.game = game;
    this.frame = 13;
    this.health = health;
  }

  update() {
    this.body.onWorldCollide = true;
    if (this.body.checkWorldBounds()) {
      this.destroy();
    }
  }

  setVelocity(x, y) {
    this.body.velocity.x = x;
    this.body.velocity.y = y;
  }

  fire(dir) {
    switch (dir) {
      case "u":
        this.setVelocity(this.body.velocity.x, -bulletSpeed);
        break;
      case "d":
        this.body.velocity.y = bulletSpeed;
        break;
      case "l":
        this.body.velocity.x = -bulletSpeed;
        break;
      case "r":
        this.body.velocity.x = bulletSpeed;
        break;
      case "ur":
        this.body.velocity.x = bulletSpeed;
        this.body.velocity.y = -bulletSpeed;
        break;
      case "ul":
        this.body.velocity.x = -bulletSpeed;
        this.body.velocity.y = -bulletSpeed;
        break;
      case "dr":
        this.body.velocity.x = bulletSpeed;
        this.body.velocity.y = bulletSpeed;
        break;
      case "dl":
        this.body.velocity.x = -bulletSpeed;
        this.body.velocity.y = bulletSpeed;
        break;
    }
  }
}
