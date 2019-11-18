class ZombieManager {
  constructor(game) {
    this.initMembers(game)
    this.initZombies()
    this.initDOMs()
  }

  initMembers = game => {
    this.game = game

    this.level = 0
    this.zombieCount = 0

    this.zombies = new Map()
  }

  initZombies = () => {
    this.setupLevel()
  }

  initDOMs = () => {
    this.updateDOMS()
  }

  update = delta => {
    this.zombies.forEach(zombie => {
      zombie.update(delta)
    })
  }

  updateDOMS = () => {
    this.updateLvlDOM()
    this.updateZBDOM()
  }

  updateLvlDOM = () => setLvlDOM(this.level)

  updateZBDOM = () => {
    setZBDOM(this.zombieCount)
  }

  setupLevel = () => {
    this.game.notificationManager.addNotif('Level up!')

    this.level++

    const count = getZombieCount(this.level)

    this.zombies.forEach(zombie => {
      const { x, y } = this.game.world.getRandomSpawner()
      zombie.revive(x, y)
    })

    for (let i = this.zombies.size; i < count; i++) {
      const { x, y } = this.game.world.getRandomSpawner()
      const newZombie = new Zombie(this.game, x, y)

      this.zombies.set(newZombie.id, newZombie)
    }

    this.zombieCount = count

    this.updateZBDOM()
    this.updateLvlDOM()
  }

  setDead = () => {
    this.zombieCount--
    this.updateZBDOM()

    if (this.zombieCount <= 0) {
      this.setupLevel()
    }
  }
}
