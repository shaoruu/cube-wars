class Player {
  constructor(game) {
    this.initMembers(game)
    this.initTexture()
    this.initListeners()
  }

  initMembers = game => {
    this.game = game

    this.isSetup = false

    this.globalPos = { x: 0, y: 0 }
    this.windowPos = { x: 0, y: 0 }

    this.movements = {
      up: false,
      down: false,
      left: false,
      right: false
    }

    this.graphics = new PIXI.Graphics()
  }

  initTexture = () => {
    this.draw()

    this.sprite = new PIXI.Sprite(graphicsToTexture(this.graphics, this.game.getRenderer()))
    this.sprite.pivot.set(0.5, 0.5)
    this.sprite.anchor.set(0.5, 0.5)

    this.game.getStage().addChild(this.sprite)
  }

  initListeners = () => {
    const up = keyboard('ArrowUp')
    const down = keyboard('ArrowDown')
    const left = keyboard('ArrowLeft')
    const right = keyboard('ArrowRight')

    up.press = () => (this.movements.up = true)
    up.release = () => (this.movements.up = false)

    down.press = () => (this.movements.down = true)
    down.release = () => (this.movements.down = false)

    left.press = () => (this.movements.left = true)
    left.release = () => (this.movements.left = false)

    right.press = () => (this.movements.right = true)
    right.release = () => (this.movements.right = false)
  }

  updateMovements = () => {}

  update = delta => {
    if (!this.isSetup) {
      const spawnpoint = game.world.getSpawnpoint()
      this.globalPos = { x: spawnpoint.x, y: spawnpoint.y }
      this.windowPos = { x: gameDOM.offsetWidth / 2, y: gameDOM.offsetHeight / 2 }
      this.isSetup = true
    }

    this.sprite.x = this.windowPos.x
    this.sprite.y = this.windowPos.y

    this.updateMovements()
  }

  draw = () => {
    this.graphics.lineStyle(2, PLAYER_OUTLINE_COLOR, 1)
    this.graphics.beginFill(PLAYER_COLOR)
    this.graphics.drawRect(this.windowPos.x, this.windowPos.y, 50, 50)
    this.graphics.endFill()
  }
}
