class Game {
  constructor(weaponSheet) {
    this.init(weaponSheet)
  }

  init = weaponSheet => {
    this.initMembers(weaponSheet)
    this.initApp()
  }

  initMembers = weaponSheet => {
    this.pixiApp = new PIXI.Application({
      autoResize: true,
      resolution: devicePixelRatio,
      backgroundColor: WALL_COLOR
    })

    this.physicsEngine = Matter.Engine.create()
    // this.physicsRenderer = Matter.Render.create({
    //   element: gameDOM,
    //   engine: this.physicsEngine,
    //   options: {
    //     width: MAP_WIDTH,
    //     height: MAP_HEIGHT,
    //     showAngleIndicator: true
    //   }
    // })

    this.world = new World(this)
    this.player = new Player(this, weaponSheet)
    this.zombieManager = new ZombieManager(this)
  }

  initApp = () => {
    gameDOM.appendChild(this.pixiApp.view)
    // Matter.Render.run(this.physicsRenderer)

    window.addEventListener('resize', this.resize)
    this.resize()

    this.pixiApp.ticker.add(this.update)

    this.physicsEngine.world.gravity.y = 0
    Matter.Engine.run(this.physicsEngine)

    Matter.Events.on(this.physicsEngine, 'collisionStart', function(event) {
      const { pairs } = event

      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i]
        if (bodyA.name === PLAYER_TAG) {
          console.log('YES')
        }
        if (bodyB.name === PLAYER_TAG) {
          console.log('YES')
        }
      }
    })
  }

  update = delta => {
    this.world.update(delta)
    this.player.update(delta)
    this.zombieManager.update(delta)
  }

  resize = () => {
    this.pixiApp.renderer.resize(gameDOM.offsetWidth, gameDOM.offsetHeight)
  }

  setBackground = color => (this.pixiApp.renderer.backgroundColor = color)

  getStage = () => this.pixiApp.stage

  getRenderer = () => this.pixiApp.renderer
}
