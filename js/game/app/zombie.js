class Zombie {
  constructor(game, x, y) {
    this.initMembers(game, x, y)
    this.initTexture()
  }

  initMembers = (game, x, y) => {
    this.game = game

    this.x = x
    this.y = y

    this.velocity = { x: 0, y: 0 }
    this.acc = getRandomZombieAcc()

    this.rigidBody = Matter.Bodies.circle(0, 0, ZOMBIE_WIDTH / 2, {
      slop: 0,
      friction: 1,
      density: 10,
      inertia: Infinity
    })
    Matter.World.add(game.physicsEngine.world, this.rigidBody)
    Matter.Body.setPosition(this.rigidBody, this)

    this.health = ZOMBIE_MAX_HEALTH

    this.id = this.rigidBody.id
  }

  initTexture = () => {
    this.graphics = new PIXI.Graphics()

    this.draw()

    this.sprite = new PIXI.Sprite(graphicsToTexture(this.graphics, this.game.getRenderer()))
    this.sprite.pivot.set(0.5, 0.5)
    this.sprite.anchor.set(0.5, 0.5)

    this.game.getStage().addChild(this.sprite)
  }

  updateMovements = delta => {
    this.velocity.x -= this.velocity.x * ZOMBIE_INERTIA * delta
    this.velocity.y -= this.velocity.y * ZOMBIE_INERTIA * delta

    const nextNode = PathFinder.findPath(this.game, this)
    if (!nextNode) return

    const { x, y } = nextNode
    const dir = { x: x - this.x, y: y - this.y }
    const aBar = Math.sqrt(dir.x ** 2 + dir.y ** 2)
    dir.x /= aBar
    dir.y /= aBar

    Matter.Body.setVelocity(this.rigidBody, {
      x: dir.x * delta * this.acc,
      y: dir.y * delta * this.acc
    })

    this.x = this.rigidBody.position.x
    this.y = this.rigidBody.position.y
  }

  updateRC = () => {
    const { r, c } = globalPosToGridPos(this)

    this.r = r
    this.c = c
  }

  update = delta => {
    this.updateRC()
    this.updateMovements(delta)

    const { x: zx, y: zy } = mapGlobalToPlayerVP(this.rigidBody.position, this.game.player)

    this.sprite.x = zx
    this.sprite.y = zy
    this.sprite.rotation = this.rigidBody.angle

    // Matter.Render.lookAt(this.game.physicsRenderer, {
    //   min: { x: this.globalPos.x - this.windowPos.x, y: this.globalPos.y - this.windowPos.y },
    //   max: {
    //     x: this.globalPos.x + (gameDOM.offsetWidth - this.windowPos.x),
    //     y: this.globalPos.y + (gameDOM.offsetHeight - this.windowPos.y)
    //   }
    // })
  }

  draw = () => {
    this.graphics.lineStyle(2, ZOMBIE_OUTLINE_COLOR, 1)
    this.graphics.beginFill(ZOMBIE_COLOR)
    this.graphics.drawRect(0, 0, ZOMBIE_WIDTH, ZOMBIE_WIDTH)
    this.graphics.endFill()
  }

  damage = dmg => {
    this.health -= dmg

    if (this.health < 0) {
      // DO THE ANIMATION HERE
      this.kill()
    }
  }

  kill = () => {
    Matter.Composite.remove(this.game.physicsEngine.world, this.rigidBody)
  }

  revive = () => {
    Matter.World.add(this.game.physicsEngine.world, this.rigidBody)
  }
}
