import Phaser from "phaser";

export default class extends Phaser.Group {
  constructor(game, player) {
    super(game);
    this.game = game;
    this.player = player;
    this.rectangle = new Phaser.Rectangle(0, 0, this.game.width, 32);

    for (let i = 0; i < this.player.maxHealth; i++) {
      this.add(new Phaser.Sprite(this.game, 32 + 24 * i, 8, "hearts", 1));
    }
    this.health = this.player.health;
  }

  update() {
    if (this.health != this.player.health) {
      this.children.pop();
      this.health = this.player.health;
    }
  }
}
