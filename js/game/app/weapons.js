class Weapons {
  constructor(player, weaponSheet) {
    this.initMembers(player)
    this.initTextures(weaponSheet)
    this.initListeners()
  }

  initMembers = player => {
    this.player = player

    this.weaponIndex = 0

    this.maxWeaponCount = 1

    this.textures = []
    this.bulletData = []
    this.bullets = new Map()

    this.lastFired = performance.now()
  }

  initTextures = weaponSheet => {
    for (let i = 0; i < WEAPON_COUNT; i++) {
      const texture = weaponSheet.spritesheet.textures[`firearm_${i}.png`]
      this.textures.push(texture)
    }

    this.sprite = new PIXI.Sprite(this.textures[this.weaponIndex])
    this.sprite.anchor.set(0.35, 0.8)
    this.sprite.zIndex = 100
    this.sprite.width = PLAYER_WEAPON_WIDTH
    this.sprite.height = PLAYER_WEAPON_HEIGHT
    this.sprite.zIndex = PLAYER_WEAPON_Z_ORDER

    this.player.game.getStage().addChild(this.sprite)

    this.processGunsData()
    this.updateDOMWeaponName()
    this.generateGoalsDOM()
  }

  initListeners = () => {
    this.shooter = keyboard(' ')
    this.shooter.press = this.startFire
    this.shooter.release = this.stopFire
  }

  update = movements => {
    this.sprite.x = this.player.sprite.x
    this.sprite.y = this.player.sprite.y

    this.tryFire()

    this.aim(movements)

    this.updateBullets()
  }

  updateBullets = () => {
    this.bullets.forEach(b => b.update())
  }

  aim = movements => {
    const { up, down, left, right } = movements

    if (!up && !down && !left && !right) return

    if (left) this.sprite.scale.y = -Math.abs(this.sprite.scale.y)
    if (right) this.sprite.scale.y = Math.abs(this.sprite.scale.y)

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
    this.weaponIndex %= this.maxWeaponCount

    this.swapTexture()
    this.updateDOMWeaponName()
  }

  prev = () => {
    this.weaponIndex--
    if (this.weaponIndex < 0) this.weaponIndex = this.maxWeaponCount - 1

    this.swapTexture()
    this.updateDOMWeaponName()
  }

  tryFire = () => {
    if (!this.firing) return

    const { cooldown } = this.bulletData[this.weaponIndex]
    const now = performance.now()

    if (now - this.lastFired > cooldown) {
      this.lastFired = now

      this.fire()
    }
  }

  startFire = () => {
    this.firing = true
  }

  stopFire = () => {
    this.firing = false
  }

  fire = () => {
    const id = this.bullets.size

    const bulletDatum = this.bulletData[this.weaponIndex]
    const newBullet = new Bullet(
      id,
      this.sprite.rotation,
      this.player.globalPos.x,
      this.player.globalPos.y,
      this,
      bulletDatum
    )

    this.bullets.set(id, newBullet)
  }

  swapTexture = () => {
    this.sprite.texture = this.textures[this.weaponIndex]
  }

  updateDOMWeaponName = () => {
    setWeaponDOM(this.bulletData[this.weaponIndex].name)
  }

  processGunsData = () => {
    for (let i = 0; i < WEAPON_COUNT; i++) {
      const {
        name,
        cooldown,
        bulletForce,
        bulletDamage,
        bulletMass,
        bulletColor,
        bulletRadius,
        bulletDurability,
        scoreThreshold
      } = GUNS_DATA[i]

      const graphics = new PIXI.Graphics()
      graphics.beginFill(bulletColor)
      graphics.drawCircle(0, 0, bulletRadius)
      graphics.endFill()

      const bulletDatum = {
        name,
        cooldown,
        mass: bulletMass,
        force: bulletForce,
        radius: bulletRadius,
        damage: bulletDamage,
        durability: bulletDurability,
        threshold: scoreThreshold,
        texture: graphicsToTexture(graphics, this.player.game.getRenderer())
      }

      this.bulletData.push(bulletDatum)
    }
  }

  generateGoalsDOM = () => {
    const table = document.createElement('table')
    table.id = 'goals-table'

    const header = table.createTHead()
    const headerRow = header.insertRow(0)
    const header1 = headerRow.insertCell(0)
    const header2 = headerRow.insertCell(1)

    header1.innerHTML = 'Weapon'
    header2.innerHTML = 'Score'

    const body = table.createTBody()

    for (let i = 0; i < GUNS_DATA.length; i++) {
      const currRow = body.insertRow(i)
      const currCell1 = currRow.insertCell(0)
      const currCell2 = currRow.insertCell(1)

      currCell1.innerHTML = GUNS_DATA[i].name
      currCell2.innerHTML = GUNS_DATA[i].scoreThreshold
    }

    goalsDOM.appendChild(table)
  }

  checkForUpgrade = () => {
    if (this.maxWeaponCount === WEAPON_COUNT) return

    const nextWeaponData = this.bulletData[this.maxWeaponCount]

    if (this.player.score >= nextWeaponData.threshold) {
      console.log('damn upgrade')
      this.upgrade()
    }
  }

  upgrade = () => {
    this.maxWeaponCount++
  }
}
