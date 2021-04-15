import Phaser from "phaser";
import Player from "../sprites/Player";
import Enemy from "../sprites/Enemy";
import Border from "../sprites/Border";
import Hud from "../sprites/Hud";
import { getRandomNum } from "../utils";
import { getBorderData, addBulletCollisions } from "../borderUtils";

let spawnTimer = 0;
let invulnTimer = 0;
const SPAWN_RATE = 4000;
const PRE_SPAWN_TIME = 2000; // ms before enemies begin spawning
const INVULN_RATE = 1000; // bigger = more invuln on hit
const DAMAGE_TINT = "0x8D4F6B";

const resetTint = (sprite) => {
  sprite.tint = "0xFFFFFF";
};

export default class extends Phaser.State {
  create() {
    this.add.sprite(0, 32, "sky");
    this.borders = this.add.group();
    this.generateBorders();
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: "player",
    });
    this.game.physics.arcade.setBounds(
      0,
      32,
      this.game.width,
      this.game.height - 32
    );
    this.game.add.existing(this.player);
    this.hud = new Hud(this.game, this.player, this);
    this.game.physics.arcade.enable(this.borders);
    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.enemies);
    this.game.physics.arcade.enable(this.player.bullets);
  }

  generateBorders() {
    const borderData = getBorderData(this.game);
    const borders = borderData.map((borderInfo) => {
      return new Border({
        game: this.game,
        x: borderInfo.x,
        y: borderInfo.y,
        asset: borderInfo.asset,
      });
    });
    this.borders.addMultiple(borders);
  }

  update() {
    addBulletCollisions(this.borders, this.player.bullets, this.game);
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
    this.game.physics.arcade.collide(this.rectangle, this.player);
    this.game.physics.arcade.collide(this.rectangle, this.enemies);
    this.game.physics.arcade.collide(this.enemies);
    this.game.physics.arcade.collide(this.player, this.borders);
    this.game.physics.arcade.collide(this.enemies, this.borders);

    this.player.alive && setTimeout(() => this.spawnEnemies(), PRE_SPAWN_TIME);
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

  getSpawnLocation(dir) {
    switch (dir) {
      case "up":
        return {
          x: getRandomNum(
            this.game.world.centerX - 140,
            this.game.world.centerX + 140
          ),
          y: 60,
        };
      case "down":
        return {
          x: getRandomNum(
            this.game.world.centerX - 140,
            this.game.world.centerX + 140
          ),
          y: this.game.height,
        };
      case "left":
        return {
          x: 0,
          y: getRandomNum(
            this.game.world.centerY - 150,
            this.game.world.centerY + 150
          ),
        };
      case "right":
        return {
          x: this.game.width,
          y: getRandomNum(
            this.game.world.centerY - 150,
            this.game.world.centerY + 150
          ),
        };
    }
  }

  spawnEnemies() {
    if (this.game.time.now > spawnTimer) {
      const directions = ["up", "down", "left", "right"];
      let randomDir = directions[Math.floor(Math.random() * directions.length)];
      let spawnLocation = this.getSpawnLocation(randomDir);
      const enemy = new Enemy({
        game: this.game,
        x: spawnLocation.x,
        y: spawnLocation.y,
        asset: "pumpkin",
        health: 3,
      });
      this.enemies.add(enemy);
      spawnTimer = game.time.now + SPAWN_RATE;
    }
  }

  hitEnemy(bullet, enemy) {
    enemy.damage(bullet.health);
    if (enemy.health === 0) {
      this.hud.addScore(100);
    }
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
    this.game.debug.start(34, 96);
    this.player &&
      this.game.debug.line(
        `Player Health: ${this.player.health}/${this.player.maxHealth}`
      );
    enemy &&
      this.game.debug.line(`Enemy Health: ${enemy.health}/${enemy.maxHealth}`);
  }
}
