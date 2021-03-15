import Phaser from "phaser";
import Bullet from "./Bullet";

const speed = 180;

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
  }

  update() {
    const lastKey = this.game.input.keyboard.lastKey;
    if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.A) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.D)
    ) {
      switch (lastKey.keyCode) {
        case Phaser.KeyCode.A:
          this.body.velocity.y = 0;
          this.body.velocity.x = -speed;
          this.animations.play("left", true);
          break;
        case Phaser.KeyCode.D:
          this.body.velocity.y = 0;
          this.body.velocity.x = speed;
          this.animations.play("right", true);
          break;
      }
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.W) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.S)
    ) {
      switch (lastKey.keyCode) {
        case Phaser.KeyCode.W:
          this.body.velocity.x = 0;
          this.body.velocity.y = -speed;
          this.animations.play("up", true);
          break;
        case Phaser.KeyCode.S:
          this.body.velocity.x = 0;
          this.body.velocity.y = speed;
          this.animations.play("down", true);
          break;
      }
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.A) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.W)
    ) {
      this.body.velocity.x = -speed;
      this.body.velocity.y = -speed;
      this.animations.play("left", true);
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.A) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.S)
    ) {
      this.body.velocity.x = -speed;
      this.body.velocity.y = speed;
      this.animations.play("left", true);
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.D) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.W)
    ) {
      this.body.velocity.x = speed;
      this.body.velocity.y = -speed;
      this.animations.play("right", true);
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.D) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.S)
    ) {
      this.body.velocity.x = speed;
      this.body.velocity.y = speed;
      this.animations.play("right", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.velocity.y = 0;
      this.body.velocity.x = -speed;
      this.animations.play("left", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.body.velocity.y = 0;
      this.body.velocity.x = speed;
      this.animations.play("right", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = -speed;
      this.animations.play("up", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = speed;
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
    // if the x or y position are negative or excede the world x or y,
    // set them equal to the upper/lower limit
    // console.log(this.position.x, this.position.y, this.world.x, this.world.y)
    if (this.position.x < 27) {
      this.position.x = 27;
    }
    // console.log(this.game.world.height)
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
      this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.UP)
    ) {
      this.shoot("ur", 250);
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)
    ) {
      this.shoot("dr", 250);
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.UP)
    ) {
      this.shoot("ul", 250);
    } else if (
      this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN) &&
      this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)
    ) {
      this.shoot("dl", 250);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      this.shoot("u", 250);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      this.shoot("d", 250);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
      this.shoot("l", 250);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
      this.shoot("r", 250);
    }
  }

  shoot(dir, speed) {
    console.log("pew");
    const bullet = new Bullet({
      game: this.game,
      x: this.x,
      y: this.y,
      health: 1,
    });
    this.bullets.add(bullet);
    this.game.debug.spriteInfo(bullet, 10, 10);
    switch (dir) {
      case "u":
        bullet.body.velocity.y = -speed;
        break;
      case "d":
        bullet.body.velocity.y = speed;
        break;
      case "l":
        bullet.body.velocity.x = -speed;
        break;
      case "r":
        bullet.body.velocity.x = speed;
        break;
      case "ur":
        bullet.body.velocity.x = speed;
        bullet.body.velocity.y = -speed;
        break;
      case "ul":
        bullet.body.velocity.x = -speed;
        bullet.body.velocity.y = -speed;
        break;
      case "dr":
        bullet.body.velocity.x = speed;
        bullet.body.velocity.y = speed;
        break;
      case "dl":
        bullet.body.velocity.x = -speed;
        bullet.body.velocity.y = speed;
        break;
    }
  }
}
