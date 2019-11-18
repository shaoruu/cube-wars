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
    this.sprite.width = PLAYER_WEAPON_WIDTH
    this.sprite.height = PLAYER_WEAPON_HEIGHT
    this.sprite.zIndex = PLAYER_WEAPON_Z_ORDER

    this.ammoCountSprite = new PIXI.Text('', {
      fontFamily: 'IBM Plus',
      fontSize: AMMO_COUNT_FONT_SIZE,
      fill: AMMO_COUNT_FONT_COLOR,
      align: 'center'
    })
    this.ammoCountSprite.zIndex = PLAYER_WEAPON_Z_ORDER
    this.ammoCountSprite.anchor.set(0.5, 0.5)

    this.player.game.getStage().addChild(this.sprite)
    this.player.game.getStage().addChild(this.ammoCountSprite)

    this.processGunsData()

    this.updateAmmoText()
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

    this.ammoCountSprite.x = this.player.sprite.x
    this.ammoCountSprite.y = this.player.sprite.y - AMMO_COUNT_SPRITE_OFFSET

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
    this.updateAmmoText()
    this.updateDOMWeaponName()
  }

  prev = () => {
    this.weaponIndex--
    if (this.weaponIndex < 0) this.weaponIndex = this.maxWeaponCount - 1

    this.swapTexture()
    this.updateAmmoText()
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
    if (this.bulletData[this.weaponIndex].ammo <= 0) return
    this.bulletData[this.weaponIndex].ammo--

    this.updateAmmoText()

    const id = performance.now()

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

  refill = () => {
    this.bulletData[this.weaponIndex].ammo = isGodMode()
      ? 99999
      : this.bulletData[this.weaponIndex].maxAmmo
    this.updateAmmoText()
  }

  swapTexture = () => {
    this.sprite.texture = this.textures[this.weaponIndex]
  }

  updateAmmoText = () => {
    this.ammoCountSprite.text = this.bulletData[this.weaponIndex].ammo
  }

  updateDOMWeaponName = () => {
    setWeaponDOM(this.bulletData[this.weaponIndex].name)
  }

  processGunsData = () => {
    for (let i = 0; i < WEAPON_COUNT; i++) {
      const {
        name,
        ammo,
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

      let alteredDamage = isGodMode() ? 10000 : bulletDamage
      let alteredDurability = isGodMode() ? 10000 : bulletDurability
      let alteredAmmoCount = isGodMode() ? 99999 : ammo

      const bulletDatum = {
        name,
        cooldown,
        maxAmmo: ammo,
        mass: bulletMass,
        force: bulletForce,
        radius: bulletRadius,
        damage: alteredDamage,
        ammo: alteredAmmoCount,
        durability: alteredDurability,
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
      this.upgrade()
    }
  }

  upgrade = () => {
    this.maxWeaponCount++

    this.player.game.notificationManager.addNotif(
      `Obtained ${GUNS_DATA[this.maxWeaponCount - 1].name}`
    )
  }
}
