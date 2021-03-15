/* globals __DEV__ */
import Phaser from "phaser";
import Bullet from "../sprites/Bullet";
import Panda from "../sprites/Panda";

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.sky = this.add.sprite(0, 0, "sky");

    this.panda = new Panda({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY + 100,
      asset: "panda",
      scale: 3,
    });

    this.game.add.existing(this.panda);
    this.game.physics.arcade.enable(this.panda);

  }

  // update() {
  //   this.game.pysics.arcade.overlap(this.panda.bullets, this.enemies, this.hitEnemy, null, this)
  // }

  // hitEnemy(bullet, enemy){
  // ...
  // }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.panda, 10, 10);
      // this.game.debug.spriteInfo(this.bullet, 10, 10)
    }
  }
}
