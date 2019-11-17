class Game {
  constructor() {
    this.init()
  }

  init = () => {
    this.initMembers()
    this.initApp()
  }

  initMembers = () => {
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
    this.player = new Player(this)
  }

  initApp = () => {
    gameDOM.appendChild(this.pixiApp.view)
    // Matter.Render.run(this.physicsRenderer)

    window.addEventListener('resize', this.resize)
    this.resize()

    this.pixiApp.ticker.add(delta => {
      this.world.update(delta)
      this.player.update(delta)
    })

    this.physicsEngine.world.gravity.y = 0
    Matter.Engine.run(this.physicsEngine)
  }

  update = () => {
    this.world.update()
    this.player.update()
  }

  resize = () => {
    this.pixiApp.renderer.resize(gameDOM.offsetWidth, gameDOM.offsetHeight)
  }

  setBackground = color => (this.pixiApp.renderer.backgroundColor = color)

  getStage = () => this.pixiApp.stage

  getRenderer = () => this.pixiApp.renderer
}
