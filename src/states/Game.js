/* globals __DEV__ */
import Phaser from "phaser";
import Bullet from "../sprites/Bullet";
import Player from "../sprites/Player";
import Enemy from "../sprites/Enemy";
import Border from "../sprites/Border";

let spawnTimer = 0;
let invulnTimer = 0;
const SPAWN_RATE = 4000;
const INVULN_RATE = 1000; //bigger = more invuln on hit
const DAMAGE_TINT = "0x8D4F6B";

const resetTint = (sprite) => {
  sprite.tint = "0xFFFFFF";
};

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.add.sprite(0, 0, "sky");
    this.borders = this.add.group();
    this.addBorders();
    this.borders.enableBody = true;
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY + 100,
      asset: "player",
    });
    this.game.add.existing(this.player);
    this.game.physics.arcade.enable(this.borders);
    this.game.physics.arcade.enable(this.player);
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
    this.game.physics.arcade.collide(
      this.player,
      this.borders,
      () => console.log("collision!"),
      null,
      this
    );
    this.player.alive && this.spawnEnemies();
    if (this.player.alive && this.enemies.getFirstAlive()) {
      this.enemies.forEachAlive(
        game.physics.arcade.moveToObject,
        game.physics.arcade,
        this.player,
        80
      );
    } else if (this.enemies.getFirstAlive()) {
      this.enemies.forEachAlive((enemy) => {
        enemy.body.stop();
      });
    }
  }

  addBorders() {
    const corner1 = new Border({
      game: this.game,
      x: 0,
      y: 0,
      asset: "cBorder",
    });
    const xBorder1 = new Border({
      game: this.game,
      x: 32,
      y: 0,
      asset: "xBorder",
    });
    const yBorder1 = new Border({
      game: this.game,
      x: 0,
      y: 32,
      asset: "yBorder",
    });
    this.borders.add(xBorder1);
    this.borders.add(corner1);
    this.borders.add(yBorder1);
  }

  spawnEnemies() {
    if (this.game.time.now > spawnTimer) {
      const enemy = new Enemy({
        game: this.game,
        x: this.world.centerX,
        y: this.world.centerY - 100,
        asset: "pumpkin",
        health: 3,
      });
      this.enemies.add(enemy);
      spawnTimer = game.time.now + SPAWN_RATE;
    }
  }

  hitEnemy(bullet, enemy) {
    enemy.damage(bullet.health);
    bullet.kill();
  }

  crashEnemy(player, enemy) {
    if (this.game.time.now > invulnTimer) {
      player.tint = DAMAGE_TINT;
      player.damage(1);
      setTimeout(() => resetTint(player), INVULN_RATE);
      invulnTimer = game.time.now + INVULN_RATE;
    }
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
      this.game.debug.line(`Enemy Health: ${enemy.health}/${enemy.maxHealth}`);
    this.player &&
      this.game.debug.line(
        `Player Health: ${this.player.health}/${this.player.maxHealth}`
      );
  }
}
