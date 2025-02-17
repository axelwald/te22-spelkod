import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(game, 0, 0, 128, 128, "#fff", 5)

    this.image = new Image()
    this.image.src = "./src/assets/Grabbmedspade1.png"
    this.attack = new Image() 
    this.attack.src = "./src/assets/Grabbmedspade2.png"
    this.currentSprite = this.image
    

    this.speedX = 0
    this.speedY = 0

    this.frameWidth = 100
    this.frameHeight = 92
    this.frameX = 0
    this.frameY = 0
    this.flip = false
    this.maxFrames = 7
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    this.attackCooldown = 0
    this.lastAttack = 0
    this.canAttack = true
  }

  update(deltaTime) {
    this.currentSprite = this.image
    
    if (this.game.keys.has("ArrowLeft")) {
      this.speedX = -this.maxSpeed
      this.flip = true
    } else if (this.game.keys.has("ArrowRight")) {
      this.flip = false
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.has("ArrowUp")) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.has("ArrowDown")) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }
    if (this.game.keys.has("x")) {
      console.log("Attacked")
      this.currentSprite = this.attack
      this.canAttack = false
      this.lastAttack = Date.now()
    }

    this.x += this.speedX
    this.y += this.speedY
    if (!this.canAttack){
      const currentTime = Date.now()
      if (currentTime - this.lastAttack >= this.attackCooldown) {
        this.attackReady = true // Cooldown is over, player can attack again
      }
    }
  }

  draw(ctx) {
    if (this.flip) {
      ctx.save()
      ctx.scale(-1, 1)
    }
    // ctx.drawImage(
    //   this.image,
    //   this.frameX * this.frameWidth,
    //   this.frameY * this.frameHeight,
    //   this.frameWidth,
    //   this.frameHeight,
    //   this.flip ? this.x * -1 - this.width : this.x,
    //   this.y,
    //   this.width,
    //   this.height,
    // )
    ctx.drawImage(
      this.currentSprite,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height,
    )
    if (this.flip) {
      ctx.restore()
    }
  }
}
