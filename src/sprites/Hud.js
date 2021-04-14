import Phaser from "phaser";

export default class extends Phaser.Group {
  constructor(game, player) {
    super(game);
    this.game = game;
    this.player = player;

    this.hearts = new Phaser.Group(this.game);
    for (let i = 0; i < this.player.health; i++) {
      this.hearts.add(
        new Phaser.Sprite(this.game, 32 + 24 * i, 8, "hearts", 1)
      );
    }
    this.health = this.player.health;
    this.score = new Phaser.Text(
      this.game,
      this.game.width - 92,
      18,
      "Score: 0"
    );
    this.add(this.score);
    this.score.anchor.set(0.5);
    this.score.addColor("#ffffff", 0);
  }

  update() {
    if (this.health != this.player.health) {
      this.hearts.children.pop();
      this.health = this.player.health;
    }
  }
}
