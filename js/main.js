PIXI.Loader.shared.add('../assets/weapons.json').load(setup)

function setup() {
  const weaponSheet = PIXI.loader.resources['../assets/weapons.json']

  new Game(weaponSheet)
}
