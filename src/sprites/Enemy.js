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

  update() {
    
  }

  shoot(dir) {
    if (this.game.time.now > bulletTime) {
      const bullet = new Bullet({
        game: this.game,
        x: this.x,
        y: this.y,
      });
      this.bullets.add(bullet);
      switch (dir) {
        case "u":
          bullet.body.velocity.y = -bulletSpeed;
          break;
        case "d":
          bullet.body.velocity.y = bulletSpeed;
          break;
        case "l":
          bullet.body.velocity.x = -bulletSpeed;
          break;
        case "r":
          bullet.body.velocity.x = bulletSpeed;
          break;
        case "ur":
          bullet.body.velocity.x = bulletSpeed;
          bullet.body.velocity.y = -bulletSpeed;
          break;
        case "ul":
          bullet.body.velocity.x = -bulletSpeed;
          bullet.body.velocity.y = -bulletSpeed;
          break;
        case "dr":
          bullet.body.velocity.x = bulletSpeed;
          bullet.body.velocity.y = bulletSpeed;
          break;
        case "dl":
          bullet.body.velocity.x = -bulletSpeed;
          bullet.body.velocity.y = bulletSpeed;
          break;
      }
      bulletTime = game.time.now + fireRate;
    }
  }
}
