import Phaser from "phaser";
import Bullet from "./Bullet";

const playerSpeed = 180;
const fireRate = 500; // higher = slower 
let bulletTime = 0;
let bulletSpeed = 250;

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame, scale }) {
    super(game, x, y, asset, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(scale);
    this.game = game;
    this.animations.add("turnLeft", [4], 1);
    this.animations.add("turnRight", [7], 1);
    this.animations.add("turnUp", [10], 1);
    this.animations.add("turnDown", [1], 1);
    this.animations.add("left", [3, 4, 5], 10);
    this.animations.add("right", [6, 7, 8], 10);
    this.animations.add("up", [9, 10, 11], 10);
    this.animations.add("down", [0, 1, 2], 10);
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.health = 3;
  }

  update() {
    const moveLeft = this.game.input.keyboard.isDown(Phaser.KeyCode.A);
    const moveRight = this.game.input.keyboard.isDown(Phaser.KeyCode.D);
    const moveUp = this.game.input.keyboard.isDown(Phaser.KeyCode.W);
    const moveDown = this.game.input.keyboard.isDown(Phaser.KeyCode.S);
    const shootLeft = this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT);
    const shootRight = this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT);
    const shootUp = this.game.input.keyboard.isDown(Phaser.KeyCode.UP);
    const shootDown = this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN);
    const lastKey = this.game.input.keyboard.lastKey;

    if (moveLeft && moveRight) {
      switch (lastKey.keyCode) {
        case Phaser.KeyCode.A:
          this.body.velocity.y = 0;
          this.body.velocity.x = 0;
          this.animations.play("turnLeft", true);
          break;
        case Phaser.KeyCode.D:
          this.body.velocity.y = 0;
          this.body.velocity.x = 0;
          this.animations.play("turnRight", true);
          break;
      }
    } else if (moveUp && moveDown) {
      switch (lastKey.keyCode) {
        case Phaser.KeyCode.W:
          this.body.velocity.x = 0;
          this.body.velocity.y = 0;
          this.animations.play("turnUp", true);
          break;
        case Phaser.KeyCode.S:
          this.body.velocity.x = 0;
          this.body.velocity.y = 0;
          this.animations.play("turnDown", true);
          break;
      }
    } else if (moveLeft && moveUp) {
      this.body.velocity.x = -playerSpeed;
      this.body.velocity.y = -playerSpeed;
      this.animations.play("left", true);
    } else if (moveLeft && moveDown) {
      this.body.velocity.x = -playerSpeed;
      this.body.velocity.y = playerSpeed;
      this.animations.play("left", true);
    } else if (moveRight && moveUp) {
      this.body.velocity.x = playerSpeed;
      this.body.velocity.y = -playerSpeed;
      this.animations.play("right", true);
    } else if (moveRight && moveDown) {
      this.body.velocity.x = playerSpeed;
      this.body.velocity.y = playerSpeed;
      this.animations.play("right", true);
    } else if (moveLeft) {
      this.body.velocity.y = 0;
      this.body.velocity.x = -playerSpeed;
      this.animations.play("left", true);
    } else if (moveRight) {
      this.body.velocity.y = 0;
      this.body.velocity.x = playerSpeed;
      this.animations.play("right", true);
    } else if (moveUp) {
      this.body.velocity.x = 0;
      this.body.velocity.y = -playerSpeed;
      this.animations.play("up", true);
    } else if (moveDown) {
      this.body.velocity.x = 0;
      this.body.velocity.y = playerSpeed;
      this.animations.play("down", true);
    } else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      if (lastKey) {
        switch (lastKey.keyCode) {
          case Phaser.KeyCode.W:
            this.animations.play("turnUp");
            break;
          case Phaser.KeyCode.A:
            this.animations.play("turnLeft");
            break;
          case Phaser.KeyCode.S:
            this.animations.play("turnDown");
            break;
          case Phaser.KeyCode.D:
            this.animations.play("turnRight");
            break;
          default:
            this.animations.play("turnDown");
            break;
        }
      }
    }
    if (this.position.x < 27) {
      this.position.x = 27;
    }
    if (this.position.x > 0.96 * this.game.world.width) {
      this.position.x = 0.96 * this.game.world.width;
    }
    if (this.position.y < 28) {
      this.position.y = 28;
    }
    if (this.position.y > 0.88 * this.game.world.height) {
      this.position.y = 0.88 * this.game.world.height;
    }

    if (
      shootRight &&
      shootUp
    ) {
      this.shoot("ur", 250);
    } else if (
      shootRight &&
      shootDown
    ) {
      this.shoot("dr", 250);
    } else if (
      shootLeft &&
      shootUp
    ) {
      this.shoot("ul", 250);
    } else if (
      shootDown &&
      shootLeft
    ) {
      this.shoot("dl", 250);
    } else if (shootUp) {
      this.shoot("u", 250);
    } else if (shootDown) {
      this.shoot("d", 250);
    } else if (shootLeft) {
      this.shoot("l", 250);
    } else if (shootRight) {
      this.shoot("r", 250);
    }
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
