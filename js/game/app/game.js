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
      resolution: devicePixelRatio
    })

    this.world = new World(this)
    this.player = new Player(this)
  }

  initApp = () => {
    gameDOM.appendChild(this.pixiApp.view)

    window.addEventListener('resize', this.resize)
    this.resize()

    this.pixiApp.ticker.add(delta => {
      this.world.update(delta)
      this.player.update(delta)
    })
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
