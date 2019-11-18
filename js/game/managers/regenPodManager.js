class RegenPodManager {
  constructor(game) {
    this.initMembers(game)
    this.initListeners()
  }

  initMembers = game => {
    this.game = game

    this.regenPods = new Map()
  }

  initListeners = () => {
    this.generateInterval = setInterval(this.genPod, REGEN_POD_INTERVAL)
  }

  update = () => {
    this.regenPods.forEach(rp => rp.update())
  }

  genPod = (zombieX, zombieY) => {
    const randomNode = this.game.world.getRandomGround()

    const x = zombieX || randomNode.x - TILE_WIDTH / 2 + TILE_WIDTH * Math.random()
    const y = zombieY || randomNode.y - TILE_WIDTH / 2 + TILE_WIDTH * Math.random()

    const id = performance.now()
    const newPod = new RegenPod(id, this.game.world, this, x, y)

    this.regenPods.set(id, newPod)
  }
}
