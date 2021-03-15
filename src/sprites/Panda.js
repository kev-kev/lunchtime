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
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      this.shoot();
    }
  }

  shoot() {
    console.log("pew");
    const bullet = new Bullet({
      game: this.game,
      x: this.x,
      y: this.y + 50,
    });
    this.bullets.add(bullet);
    this.game.debug.spriteInfo(bullet, 10, 10)
    

    // this.shotSound.play(...);
    // let bullet = this.bullets.getFirstExists(false);
    // if (!bullet) {
    //     bullet = new Bullet({
    //         game: this.game,
    //         x: this.x,
    //         y: this.y,
    //         // health: 3,
    //         asset: 'bullet',
    //     });
    //     this.bullets.add(bullet);
    // }
    // else {
    //     bullet.reset(this.x, this.y, 3);
    // }

    bullet.body.velocity.y = 250;
  }
}
