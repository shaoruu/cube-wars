class Zombie {
  constructor(game, x, y) {
    this.initMembers(game, x, y)
    this.initTexture()
  }

  initMembers = (game, x, y) => {
    this.game = game

    this.x = x
    this.y = y

    this.stunned = false
    this.isRegular = true

    this.lastDealtDamage = performance.now()

    this.velocity = { x: 0, y: 0 }
    this.acc = getRandomZombieAcc()

    this.rigidBody = Matter.Bodies.circle(0, 0, ZOMBIE_WIDTH / 2, {
      slop: 0,
      friction: 1
      // density: 10,
      // inertia: Infinity
    })
    this.rigidBody.isZombie = true
    this.rigidBody.parentRef = this
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
    this.sprite.zIndex = ZOMBIE_Z_ORDER

    this.game.getStage().addChild(this.sprite)
  }

  updateMovements = delta => {
    this.velocity.x -= this.velocity.x * ZOMBIE_INERTIA * delta
    this.velocity.y -= this.velocity.y * ZOMBIE_INERTIA * delta

    const nextNode = PathFinder.findPath(this.game, this)
    if (!nextNode) return

    const { x, y } = nextNode
    const dir = { x: x - this.x, y: y - this.y }
    if (this.stunned) {
      dir.x /= 100
      dir.y /= 100
    } else {
      const aBar = Math.sqrt(dir.x ** 2 + dir.y ** 2)
      dir.x /= aBar
      dir.y /= aBar
    }

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

  knockback = bullet => {
    const { damage, force, horzDelta, vertDelta } = bullet

    this.stunned = true

    Matter.Body.applyForce(
      this.rigidBody,
      { x: this.rigidBody.position.x, y: this.rigidBody.position.y },
      { x: force * damage * horzDelta * 1000, y: force * damage * vertDelta * 1000 }
    )

    this.damage(force)

    setTimeout(() => (this.stunned = false), ZOMBIE_STUNNED_DELAY)
  }

  damage = dmg => {
    this.health -= dmg

    this.game.world.markBlood(this)

    if (this.health < 0) {
      // DO THE ANIMATION HERE
      this.kill()
    }
  }

  kill = () => {
    createjs.Tween.get(this.sprite)
      .to({ alpha: 0 }, ZOMBIE_DEATH_ANIMATION_DELAY)
      .call(() => this.game.getStage().removeChild(this.sprite))
    Matter.Composite.remove(this.game.physicsEngine.world, this.rigidBody)

    this.game.player.killedZombie(this)
  }

  revive = () => {
    this.game.getStage().addChild(this.sprite)
    Matter.World.add(this.game.physicsEngine.world, this.rigidBody)
  }

  get canDoDamage() {
    const now = performance.now()
    if (now - this.lastDealtDamage > ZOMBIE_REGULAR_ATTACK_COOLDOWN) {
      this.lastDealtDamage = now
      return true
    }
    return false
  }
}
