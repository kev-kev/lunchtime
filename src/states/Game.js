/* globals __DEV__ */
import Phaser from "phaser";
import Bullet from "../sprites/Bullet";
import Player from "../sprites/Player";

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.sky = this.add.sprite(0, 0, "sky");

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY + 100,
      asset: "player",
      scale: 3,
    });

    this.game.add.existing(this.player);
    this.game.physics.arcade.enable(this.player);
  }

  // update() {
  //   this.game.pysics.arcade.overlap(this.player.bullets, this.enemies, this.hitEnemy, null, this)
  // }

  // hitEnemy(bullet, enemy){
  // ...
  // }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.player, 10, 10);
      // this.game.debug.spriteInfo(this.bullet, 10, 10)
    }
  }
}
