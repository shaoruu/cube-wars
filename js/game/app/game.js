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
    this.regenPodManager = new RegenPodManager(this)
  }

  initApp = () => {
    gameDOM.appendChild(this.pixiApp.view)
    // Matter.Render.run(this.physicsRenderer)

    window.addEventListener('resize', this.resize)
    this.resize()

    this.pixiApp.ticker.add(this.update)
    this.getStage().sortableChildren = true

    this.physicsEngine.world.gravity.y = 0
    Matter.Engine.run(this.physicsEngine)

    Matter.Events.on(this.physicsEngine, 'collisionStart', function(event) {
      const { pairs } = event

      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i]
        if ((bodyA.isPlayer && bodyB.isZombie) || (bodyA.isZombie && bodyB.isPlayer)) {
          let zombieRef = bodyA.isZombie ? bodyA.parentRef : bodyB.parentRef
          let playerRef = bodyA.isPlayer ? bodyA.parentRef : bodyB.parentRef

          playerRef.damage(zombieRef)
        } else if ((bodyA.isRegenPod && bodyB.isPlayer) || (bodyA.isPlayer && bodyB.isRegenPod)) {
          let regenPodRef = bodyA.isRegenPod ? bodyA.parentRef : bodyB.parentRef
          let playerRef = bodyA.isPlayer ? bodyA.parentRef : bodyB.parentRef

          playerRef.regenerate(regenPodRef)
        } else if ((bodyA.isZombie && bodyB.isBullet) || (bodyA.isBullet && bodyB.isZombie)) {
          let zombieRef = bodyA.isZombie ? bodyA.parentRef : bodyB.parentRef
          let bulletRef = bodyA.isBullet ? bodyA.parentRef : bodyB.parentRef

          zombieRef.knockback(bulletRef)
          bulletRef.usedOnce()
        } else if ((bodyA.isWall && bodyB.isBullet) || (bodyA.isBullet && bodyB.isWall)) {
          let bulletRef = bodyA.isBullet ? bodyA.parentRef : bodyB.parentRef

          bulletRef.destroy()
        }
      }
    })

    Matter.Events.on(this.physicsEngine, 'collisionActive', function(event) {
      const { pairs } = event

      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i]
        if ((bodyA.isPlayer && bodyB.isZombie) || (bodyA.isZombie && bodyB.isPlayer)) {
          let zombieRef = bodyA.isZombie ? bodyA.parentRef : bodyB.parentRef
          let playerRef = bodyA.isPlayer ? bodyA.parentRef : bodyB.parentRef

          if (zombieRef.canDoDamage) playerRef.damage(zombieRef)
        }
      }
    })
  }

  update = delta => {
    this.world.update(delta)
    this.player.update(delta)
    this.zombieManager.update(delta)
    this.regenPodManager.update()
  }

  resize = () => {
    this.pixiApp.renderer.resize(gameDOM.offsetWidth, gameDOM.offsetHeight)
  }

  setBackground = color => (this.pixiApp.renderer.backgroundColor = color)

  getStage = () => this.pixiApp.stage

  getRenderer = () => this.pixiApp.renderer
}
