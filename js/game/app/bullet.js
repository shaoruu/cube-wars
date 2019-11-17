class Bullet {
  constructor(id, rotation, x, y, wcRef, { force, texture, radius, damage, durability, mass }) {
    this.initMembers(id, rotation, x, y, force, radius, damage, mass, durability, wcRef)
    this.initTexture(texture, radius)
    this.initBullet()
  }

  initMembers = (id, rotation, x, y, force, radius, damage, mass, durability, wcRef) => {
    this.id = id

    this.wc = wcRef

    this.horzDelta = Math.cos(rotation)
    this.vertDelta = Math.sin(rotation)

    this.x = x
    this.y = y

    this.force = force
    this.damage = damage
    this.durability = durability

    this.rigidBody = Matter.Bodies.circle(0, 0, radius, {
      mass,
      isSensor: true
    })

    this.rigidBody.isBullet = true
    this.rigidBody.parentRef = this

    Matter.World.add(this.wc.player.game.physicsEngine.world, this.rigidBody)
    Matter.Body.setPosition(this.rigidBody, this)
  }

  initTexture = (texture, radius) => {
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.pivot.set(0.5, 0.5)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = radius * 2
    this.sprite.height = radius * 2

    this.wc.player.game.getStage().addChild(this.sprite)
  }

  initBullet = () => {
    Matter.Body.applyForce(
      this.rigidBody,
      { x: this.rigidBody.position.x, y: this.rigidBody.position.y },
      {
        x: this.force * this.horzDelta,
        y: this.force * this.vertDelta
      }
    )
  }

  update = () => {
    const { x: bx, y: by } = mapGlobalToPlayerVP(this.rigidBody.position, this.wc.player)

    this.sprite.x = bx
    this.sprite.y = by
    this.sprite.rotation = this.rigidBody.angle
  }

  usedOnce = () => {
    this.durability--

    if (this.durability <= 0) {
      this.destroy()
    }
  }

  destroy = () => {
    Matter.Composite.remove(this.wc.player.game.physicsEngine.world, this.rigidBody)
    this.wc.player.game.getStage().removeChild(this.sprite)

    this.wc.bullets.delete(this.id)
  }
}
