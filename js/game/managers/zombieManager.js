class ZombieManager {
  constructor(game) {
    this.initMembers(game)
    this.initZombies()
  }

  initMembers = game => {
    this.game = game

    this.level = 1

    this.zombies = new Map()
  }

  initZombies = () => {
    this.setupLevel()
  }

  update = delta => {
    this.zombies.forEach(zombie => {
      zombie.update(delta)
    })
  }

  setupLevel = () => {
    const count = getZombieCount(this.level)

    for (let i = this.zombies.size; i < count; i++) {
      const { x, y } = this.game.world.getRandomSpawner()
      const newZombie = new Zombie(this.game, x, y)

      this.zombies.set(newZombie.id, newZombie)
    }

    console.log(this.zombies)
  }

  killZombieById = id => {
    try {
      this.zombies[id].kill()
    } catch (e) {
      console.log(e)
    }
  }
}
