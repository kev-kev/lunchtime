import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame, scale }) {
    super(game, x, y, asset, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(scale);
    this.game = game;
    this.animations.add("turn", [1], 20);
    this.animations.add("left", [3, 4, 5], 10);
    this.animations.add("right", [6, 7, 8], 10);
    // this.game.physics.arcade.enable(this);
    // game.physics.add.existing(this);
    console.log(this.body);
  }

  update() {
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.velocity.x = -160;
      this.animations.play("left", true);
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.body.velocity.x = 160;
      this.animations.play("right", true);
    } else {
      this.body.velocity.x = 0;
      this.animations.play("turn");
    }
  }
}
