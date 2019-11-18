class RegenPod {
  constructor(id, world, rpm, x, y) {
    this.initMembers(id, world, rpm, x, y)
    this.initTexture()
  }

  initMembers = (id, world, rpm, x, y) => {
    this.id = id

    this.world = world
    this.rpm = rpm

    this.x = x
    this.y = y

    this.graphics = new PIXI.Graphics()

    this.rigidBody = Matter.Bodies.rectangle(0, 0, REGEN_POD_WIDTH, REGEN_POD_WIDTH, {
      isSensor: true
    })
    this.rigidBody.isRegenPod = true
    this.rigidBody.parentRef = this
    Matter.World.add(this.world.game.physicsEngine.world, this.rigidBody)
    Matter.Body.setPosition(this.rigidBody, this)
  }

  initTexture = () => {
    this.draw()

    this.sprite = new PIXI.Sprite(
      graphicsToTexture(this.graphics, this.world.game.getRenderer())
    )
    this.sprite.pivot.set(0.5, 0.5)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = REGEN_POD_WIDTH
    this.sprite.width = REGEN_POD_WIDTH
    this.sprite.zIndex = REGEN_POD_Z_ORDER

    this.world.game.getStage().addChild(this.sprite)
  }

  update = () => {
    const { x: rx, y: ry } = mapGlobalToPlayerVP(this, this.world.game.player)

    this.sprite.x = rx
    this.sprite.y = ry
  }

  draw = () => {
    this.graphics.beginFill(REGEN_POD_COLOR)
    this.graphics.drawRect(0, 0, REGEN_POD_WIDTH, REGEN_POD_WIDTH)
    this.graphics.endFill()
  }

  destroy = () => {
    Matter.Composite.remove(this.world.game.physicsEngine.world, this.rigidBody)
    this.world.game.getStage().removeChild(this.sprite)

    this.rpm.regenPods.delete(this.id)
  }
}
