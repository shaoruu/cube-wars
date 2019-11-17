class Player {
  constructor(game, weaponSheet) {
    this.initMembers(game)
    this.initTexture(weaponSheet)
    this.initListeners()
  }

  initMembers = game => {
    this.game = game

    this.isSetup = false

    this.score = 0

    this.globalPos = { x: 0, y: 0 }
    this.windowPos = { x: 0, y: 0 }

    this.movements = {
      up: false,
      down: false,
      left: false,
      right: false
    }

    this.velocity = {
      x: 0,
      y: 0
    }

    this.health = PLAYER_MAX_HEALTH

    this.rigidBody = Matter.Bodies.circle(0, 0, PLAYER_WIDTH / 2, {
      // slop: 0,
      friction: 1,
      inertia: Infinity
    })
    this.rigidBody.isPlayer = true
    this.rigidBody.parentRef = this
    Matter.World.add(game.physicsEngine.world, this.rigidBody)

    this.healthbarContainer = new PIXI.Container()
  }

  initTexture = weaponSheet => {
    this.graphics = new PIXI.Graphics()

    this.draw()
    this.drawHealthbar()

    this.sprite = new PIXI.Sprite(graphicsToTexture(this.graphics, this.game.getRenderer()))
    this.sprite.pivot.set(0.5, 0.5)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.zIndex = PLAYER_Z_ORDER

    this.game.getStage().addChild(this.sprite)
    this.game.getStage().addChild(this.healthbarContainer)

    this.healthbarContainer.zIndex = PLAYER_HEALTH_BAR_Z_ORDER

    this.weapons = new Weapons(this, weaponSheet)
  }

  initListeners = () => {
    const up = keyboard('ArrowUp')
    const kUp = keyboard('w')
    const down = keyboard('ArrowDown')
    const kDown = keyboard('s')
    const left = keyboard('ArrowLeft')
    const kLeft = keyboard('a')
    const right = keyboard('ArrowRight')
    const kRight = keyboard('d')

    kUp.press = up.press = () => (this.movements.up = true)
    kUp.release = up.release = () => (this.movements.up = false)

    kDown.press = down.press = () => (this.movements.down = true)
    kDown.release = down.release = () => (this.movements.down = false)

    kLeft.press = left.press = () => (this.movements.left = true)
    kLeft.release = left.release = () => (this.movements.left = false)

    kRight.press = right.press = () => (this.movements.right = true)
    kRight.release = right.release = () => (this.movements.right = false)
  }

  updateRC = () => {
    const { r, c } = globalPosToGridPos(this.globalPos)

    this.r = r
    this.c = c
  }

  updateMovements = delta => {
    this.velocity.x -= this.velocity.x * PLAYER_INERTIA * delta
    this.velocity.y -= this.velocity.y * PLAYER_INERTIA * delta

    const { up, down, left, right } = this.movements

    if (up) this.velocity.y -= PLAYER_ACC
    if (down) this.velocity.y += PLAYER_ACC
    if (left) this.velocity.x -= PLAYER_ACC
    if (right) this.velocity.x += PLAYER_ACC

    // console.log(this.velocity)
    // Matter.Body.translate(this.rigidBody, this.velocity)
    Matter.Body.setVelocity(this.rigidBody, {
      x: this.velocity.x * delta,
      y: this.velocity.y * delta
    })

    const deltaX = this.rigidBody.position.x - this.globalPos.x
    const deltaY = this.rigidBody.position.y - this.globalPos.y

    if (Math.sign(deltaY) < 0) {
      if (this.windowPos.y + deltaY >= VIEWPORT_PADDING) {
        this.windowPos.y += deltaY
      }
    }

    if (Math.sign(deltaY) > 0) {
      if (this.windowPos.y + deltaY <= gameDOM.offsetHeight - VIEWPORT_PADDING) {
        this.windowPos.y += deltaY
      }
    }

    if (Math.sign(deltaX) < 0) {
      if (this.windowPos.x + deltaX >= VIEWPORT_PADDING) {
        this.windowPos.x += deltaX
      }
    }

    if (Math.sign(deltaX > 0)) {
      if (this.windowPos.x + deltaX <= gameDOM.offsetWidth - VIEWPORT_PADDING) {
        this.windowPos.x += deltaX
      }
    }

    this.globalPos.x = this.rigidBody.position.x
    this.globalPos.y = this.rigidBody.position.y
  }

  update = delta => {
    if (!this.isSetup) {
      const spawnpoint = this.game.world.getSpawnpoint()

      this.globalPos = { x: spawnpoint.x, y: spawnpoint.y }
      this.windowPos = { x: gameDOM.offsetWidth / 2, y: gameDOM.offsetHeight / 2 }

      Matter.Body.setPosition(this.rigidBody, this.globalPos)

      this.isSetup = true
    }

    this.updateRC()
    this.updateMovements(delta)

    this.sprite.x = this.windowPos.x
    this.sprite.y = this.windowPos.y
    this.sprite.rotation = this.rigidBody.angle

    this.healthbarContainer.x = this.windowPos.x - HEALTH_BAR_MAX_WIDTH / 2
    this.healthbarContainer.y = this.windowPos.y - HEALTH_BAR_OFFSET

    this.weapons.update(this.movements)

    // Matter.Render.lookAt(this.game.physicsRenderer, {
    //   min: { x: this.globalPos.x - this.windowPos.x, y: this.globalPos.y - this.windowPos.y },
    //   max: {
    //     x: this.globalPos.x + (gameDOM.offsetWidth - this.windowPos.x),
    //     y: this.globalPos.y + (gameDOM.offsetHeight - this.windowPos.y)
    //   }
    // })
  }

  updateHealthbar = () => {
    this.healthbarContainer.inner.width = (HEALTH_BAR_MAX_WIDTH * this.health) / PLAYER_MAX_HEALTH
  }

  draw = () => {
    this.graphics.lineStyle(2, PLAYER_OUTLINE_COLOR, 1)
    this.graphics.beginFill(PLAYER_COLOR)
    this.graphics.drawRect(this.windowPos.x, this.windowPos.y, PLAYER_WIDTH, PLAYER_WIDTH)
    this.graphics.endFill()
  }

  drawHealthbar = () => {
    const outerBar = new PIXI.Graphics()
    outerBar.beginFill(HEALTH_BAR_BACKGROUND_COLOR)
    outerBar.drawRect(0, 0, HEALTH_BAR_MAX_WIDTH, HEALTH_BAR_HEIGHT)
    outerBar.endFill()
    this.healthbarContainer.addChild(outerBar)

    const innerBar = new PIXI.Graphics()
    innerBar.beginFill(HEALTH_BAR_COLOR)
    innerBar.drawRect(0, 0, HEALTH_BAR_MAX_WIDTH, HEALTH_BAR_HEIGHT)
    innerBar.endFill()
    this.healthbarContainer.addChild(innerBar)

    this.healthbarContainer.inner = innerBar
  }

  killedZombie = zombie => {
    if (zombie.isRegular) {
      this.score += Math.floor(
        REGULAR_ZOMBIE_KILL_SCORE * SCORE_RANGE[0] +
          (SCORE_RANGE[1] - SCORE_RANGE[0]) * Math.random() * REGULAR_ZOMBIE_KILL_SCORE
      )

      setScoreDOM(this.score)
    }
  }

  damage = zombie => {
    let dmg
    if (zombie.isRegular) dmg = ZOMBIE_REGULAR_DAMAGE
    else dmg = 10000000

    this.health -= dmg

    this.updateHealthbar()

    if (this.health <= 0) {
      this.health = 0
    }
  }

  regenerate = regenPod => {
    this.health += REGEN_POD_VALUE
    if (this.health > PLAYER_MAX_HEALTH) this.health = PLAYER_MAX_HEALTH

    this.updateHealthbar()

    regenPod.destroy()
  }

  getCurrentNode = () => {
    return this.game.world.getNodeFromRC(this.r, this.c)
  }
}
