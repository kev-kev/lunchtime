import Phaser, { StateManager } from "phaser";

export default class extends Phaser.Group {
  constructor(game, player, gameState) {
    super(game);
    this.game = game;
    this.player = player;
    this.score = 0;
    this.gameState = gameState;

    this.hearts = new Phaser.Group(this.game);
    for (let i = 0; i < this.player.health; i++) {
      this.hearts.add(
        new Phaser.Sprite(this.game, 32 + 24 * i, 8, "hearts", 1)
      );
    }
    this.health = this.player.health;
    this.scoreText = new Phaser.Text(
      this.game,
      this.game.width - 92,
      18,
      `Score: ${this.score}`
    );
    this.add(this.scoreText);
    this.scoreText.anchor.set(0.5);
    this.scoreText.addColor("#ffffff", 0);
  }

  addScore(num) {
    this.scoreText.setText(`Score: ${(this.score += num)}`);
  }

  gameOver() {
    this.gameState.state.start("GameOver");
  }

  update() {
    if (this.health != this.player.health) {
      this.hearts.children.pop();
      this.health = this.player.health;
    }
    if (this.player.health === 0) {
      this.player.destroy();
      this.gameOver();
      this.player.health -= 1;
    }
  }
}
