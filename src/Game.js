import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import Enemy from "./Enemy.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.keys = new Set()
    new InputHandler(this)

    this.debug = false

    this.player = new Player(this)

    this.gameObjects = []
    this.enemies = [];

    for (let index = 0; index < 10000; index++) {
      let enemy = new Enemy(this, Math.random() * this.width, Math.random() * this.height, 20, 20, "#f00", 100);
      this.enemies.push(enemy)

    }
  }
  update(deltaTime) {
    console.log(this.enemies)

    this.gameObjects.forEach(gameObject => {
      gameObject.update(deltaTime)
    })
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime)
    })
    this.player.update(deltaTime)
  }

  draw(ctx) {
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(ctx)
    })

    this.enemies.forEach(enemy => {
      enemy.draw(ctx)
    })
    this.player.draw(ctx)
  }
}
