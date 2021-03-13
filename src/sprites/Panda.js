import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame, scale }) {
    super(game, x, y, asset, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(scale);
    this.game = game;
    this.animations.add("turnLeft", [4], 20);
    this.animations.add("turnRight", [7], 20);
    this.animations.add("turnUp", [10], 20);
    this.animations.add("turnDown", [1], 20);
    this.animations.add("left", [3, 4, 5], 10);
    this.animations.add("right", [6, 7, 8], 10);
    this.animations.add("up", [9, 10, 11], 10);
    this.animations.add("down", [0, 1, 2], 10);
  }

  update() {
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.velocity.x = -160;
      this.animations.play("left", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.body.velocity.x = 160;
      this.animations.play("right", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.velocity.y = 160;
      this.animations.play("down", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.velocity.y = -160;
      this.animations.play("up", true);
    } else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      const lastKey = this.game.input.keyboard.lastKey;
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
  }
}
