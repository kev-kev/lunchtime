import Phaser from "phaser";

let ref = true;
export default class extends Phaser.State {
  render() {
    if (ref) {
      console.log("gameover screen");
      ref = false;
    }
  }
}
