import GameObject from "./GameObject"

export default class Enemy extends GameObject {
  constructor(game,x,y) {
    super(game, x,y, 128, 128, "#fff", 5)
    
    this.x = x;
    this.y = y;
    this.image = new Image()
    this.image.src = "./src/assets/isbjörn.png"

    this.speedX = 0
    this.speedY = 0
    this.speed = 0.5
    console.log(this.game) 
  }


  update(deltaTime){
    let dx = this.game.player.x - this.x
    let dy = this.game.player.y - this.y

    this.x += dx/60 * this.speed
    this.y += dy/60 * this.speed

    if (this.x - this.game.player.x < 0){
      this.flip = true
    } else{
      this.flip = false
    }

  }


  draw(ctx) {
    if (this.flip) {
      ctx.save()
      ctx.scale(-1, 1)
    }
    ctx.drawImage(
      this.image,
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
