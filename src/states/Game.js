/* globals __DEV__ */
import Phaser from "phaser";
import Bullet from "../sprites/Bullet";
import Player from "../sprites/Player";
import Enemy from "../sprites/Enemy";

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.sky = this.add.sprite(0, 0, "sky");
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY + 100,
      asset: "player",
    });

    this.game.add.existing(this.player);
    this.game.physics.arcade.enable(this.player);
    const enemy = new Enemy({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY - 100,
      asset: "pumpkin",
      health: 3,
    });
    this.enemies.add(enemy);
    this.game.physics.arcade.enable(this.enemies);
  }

  update() {
    this.game.physics.arcade.overlap(
      this.player.bullets,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
    this.game.physics.arcade.overlap(
      this.player,
      this.enemies,
      this.crashEnemy,
      null,
      this
    );
    if (this.player.alive && this.enemies.getFirstAlive()) {
      this.enemies.forEachAlive(
        game.physics.arcade.moveToObject,
        game.physics.arcade,
        this.player,
        80
      );
    } else if (this.enemies.getFirstAlive()) {
      this.enemies.forEachAlive(
        // stop moving
      );
    }
  }

  hitEnemy(bullet, enemy) {
    enemy.damage(bullet.health);
    bullet.kill();
  }

  crashEnemy(player, enemy) {
    player.damage(1);
  }

  render() {
    if (__DEV__) {
      this.displayDebugInfo();
    }
  }

  displayDebugInfo() {
    let enemy = this.enemies.getFirstAlive();
    this.game.debug.start(32, 32);
    enemy && 
    this.player && this.game.debug.body(this.player, null, false);
    if (enemy) {
      this.game.debug.line(`Health: ${enemy.health}/${enemy.maxHealth}`);
      this.game.debug.body(enemy, null, false);
    }
  }
}
