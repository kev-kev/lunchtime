import Phaser from "phaser";

let ref = true;
export default class extends Phaser.State {
  preload() {
    const text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      "Game Over",
      { font: "48px Arial", fill: "#ffffff", align: "center" }
    );
    text.anchor.setTo(0.5);
    this.load.text(text);
  }

  render() {
    if (ref) {
      console.log("gameover screen");
      ref = false;
    }
  }
}
