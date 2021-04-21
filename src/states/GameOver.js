import Phaser from "phaser";

let ref = true;
export default class extends Phaser.State {
  preload() {
    const text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      "GAME OVER",
      { font: "48px Bangers", fill: "#ffffff", align: "center" }
    );
    text.anchor.setTo(0.5);
    this.load.text(text);
    const restartText = this.add.text(
      this.world.centerX,
      this.world.centerY + 64,
      "RESTART?",
      { font: "32px Bangers", fill: "#ffffff", align: "center" }
    );
    restartText.anchor.setTo(0.5);
    restartText.inputEnabled = true;
    restartText.events.onInputDown.add(down, this);
    this.load.text(restartText);
    function down() {
      this.state.start("Game");
    }
  }

  render() {
    if (ref) {
      console.log("gameover screen");
      ref = false;
    }
  }
}
