

class Particle {
  
  constructor(maxR_, s_, c_, speed_) {
    this.particleSize = s_
    this.color = c_
    this.maxR = maxR_
    this.speed = speed_
    
    this.life = random(60,150)    
    this.init()
  }
  
  init() {
    this.pos = p5.Vector.random2D()
    this.pos.normalize()
    this.pos.mult(random(2, maxR))
    this.vel = createVector()
  }

  show() {
  if (this.checkEffector()) {
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.particleSize, this.particleSize)
    this.life -= 1
  } else this.life = 0
  }
  
  move() {
    var angle = noise((this.pos.x + noisePosition) / noiseRes, (this.pos.y + noisePosition)/ noiseRes) * TAU
    this.vel.set(cos(angle), sin(angle))
    this.vel.mult(this.speed)
    this.pos.add(this.vel)
    
  }

checkEffector() {
  let posX = int(map(this.pos.x, -width/2, width/2, 0, width - 1 , true)); 
  let posY = int(map(this.pos.y, -height/2, height/2, 0, height - 1, true))
  let effect = effectors[posY][posX]
  if (effect === 255) return false
  else return true
}
  

  isDead() {
    if(this.life < 1 || !this.checkEffector()) return true
    else return false
  
  }
}