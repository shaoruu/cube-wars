class Weapons {
  constructor(player, weaponSheet) {
    this.initMembers(player)
    this.initTextures(weaponSheet)
  }

  initMembers = player => {
    this.player = player

    this.weaponIndex = 0

    this.maxWeaponCount = 1

    this.textures = []
  }

  initTextures = weaponSheet => {
    for (let i = 0; i < WEAPON_COUNT; i++) {
      const texture = weaponSheet[`firearm_${i}.png`]
      this.textures.push(texture)
    }

    this.sprite = new PIXI.Sprite(this.textures[this.weaponIndex])
    this.sprite.zOrder = 100
    this.sprite.width = 1000
    this.sprite.height = 1000

    this.player.game.getStage().addChild(this.sprite)
  }

  update = movements => {
    this.sprite.x = this.player.sprite.x
    this.sprite.y = this.player.sprite.y

    this.aim(movements)
  }

  aim = movements => {
    const { up, down, left, right } = movements

    let angle = 0
    if (down && right) angle = Math.PI / 4
    else if (down && left) angle = (Math.PI * 3) / 4
    else if (up && right) angle = -Math.PI / 4
    else if (up && left) angle = (-3 * Math.PI) / 4
    else if (up) angle = -Math.PI / 2
    else if (down) angle = Math.PI / 2
    else if (left) angle = -Math.PI

    this.sprite.rotation = angle
  }

  next = () => {
    this.weaponIndex++
    this.weaponIndex %= WEAPON_COUNT

    this.swapTexture()
  }

  prev = () => {
    this.weaponIndex--
    this.weaponIndex %= WEAPON_COUNT

    this.swapTexture()
  }

  swapTexture = () => {
    this.sprite.texture = this.textures[this.weaponIndex]
  }

  upgrade = () => {
    this.maxWeaponCount++
  }
}
