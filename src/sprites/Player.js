import Phaser from "phaser";
import Bullet from "./Bullet";

const PLAYER_SPEED = 200;
const FIRE_RATE = 200; // higher = slower
let bulletTimer = 0;

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame);
    this.game = game;
    this.anchor.setTo(0.5);
    this.scale.setTo(2);
    this.addAnimations();
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.health = 3;
    this.maxHealth = 3;
  }

  addAnimations() {
    this.animations.add("turnLeft", [4], 1);
    this.animations.add("turnRight", [7], 1);
    this.animations.add("turnUp", [10], 1);
    this.animations.add("turnDown", [1], 1);
    this.animations.add("moveLeft", [3, 4, 5], 10);
    this.animations.add("moveRight", [6, 7, 8], 10);
    this.animations.add("moveUp", [9, 10, 11], 10);
    this.animations.add("moveDown", [0, 1, 2], 10);
  }

  update() {
    this.listenForMove();
    this.listenForShoot();
    this.body.setSize(18, 25, 8, 7);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
  }

  listenForMove() {
    const moveUp = this.game.input.keyboard.isDown(Phaser.KeyCode.W);
    const moveLeft = this.game.input.keyboard.isDown(Phaser.KeyCode.A);
    const moveDown = this.game.input.keyboard.isDown(Phaser.KeyCode.S);
    const moveRight = this.game.input.keyboard.isDown(Phaser.KeyCode.D);
    const lastKey = this.game.input.keyboard.lastKey;

    if ((moveLeft && moveRight) || (moveUp && moveDown)) {
      // Keys pressed in opposite direction = stop moving
      // and face the last pressed direction
      this.setVelocity(0, 0);
      this.playAnimationBasedOnLastKey(lastKey);
    } else if (moveLeft) {
      if (moveUp) {
        this.setVelocity(-PLAYER_SPEED, -PLAYER_SPEED);
      } else if (moveDown) {
        this.setVelocity(-PLAYER_SPEED, PLAYER_SPEED);
      } else {
        this.setVelocity(-PLAYER_SPEED, 0);
      }
      this.animations.play("moveLeft");
    } else if (moveRight) {
      if (moveUp) {
        this.setVelocity(PLAYER_SPEED, -PLAYER_SPEED);
      } else if (moveDown) {
        this.setVelocity(PLAYER_SPEED, PLAYER_SPEED);
      } else {
        this.setVelocity(PLAYER_SPEED, 0);
      }
      this.animations.play("moveRight");
    } else if (moveUp) {
      this.setVelocity(0, -PLAYER_SPEED);
      this.animations.play("moveUp");
    } else if (moveDown) {
      this.setVelocity(0, PLAYER_SPEED);
      this.animations.play("moveDown");
    } else {
      this.setVelocity(0, 0);
      if (lastKey) {
        this.playAnimationBasedOnLastKey(lastKey);
      }
    }
  }

  listenForShoot() {
    const shootLeft = this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT);
    const shootRight = this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT);
    const shootUp = this.game.input.keyboard.isDown(Phaser.KeyCode.UP);
    const shootDown = this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN);

    if (shootRight && shootUp) {
      this.shoot("ur", 250);
    } else if (shootRight && shootDown) {
      this.shoot("dr", 250);
    } else if (shootLeft && shootUp) {
      this.shoot("ul", 250);
    } else if (shootDown && shootLeft) {
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

  playAnimationBasedOnLastKey(lastKey) {
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

  setVelocity(x, y) {
    this.body.velocity.x = x;
    this.body.velocity.y = y;
  }

  shoot(dir) {
    if (this.game.time.now > bulletTimer) {
      const bullet = new Bullet({
        game: this.game,
        x: this.x,
        y: this.y,
        health: 1,
      });
      this.bullets.add(bullet);
      bullet.fire(dir);
      bulletTimer = game.time.now + FIRE_RATE;
    }
  }
}
