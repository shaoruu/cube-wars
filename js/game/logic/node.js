class Node {
  constructor(state, r, c) {
    this.initMembers(r, c)
    this.initState(state)
  }
  initMembers = (r, c) => {
    this.r = r
    this.c = c

    this.x = this.c * TILE_WIDTH
    this.y = this.r * TILE_WIDTH

    this.gCost = 0
    this.hCost = 0

    this.parent = null

    this.isSpawner = false
    this.walkable = true
  }

  initState = state => {
    this.color = GROUND_COLOR
    switch (state) {
      case WALL_STATE:
        this.walkable = false
        this.color = WALL_COLOR
        break
      case CORNER_STATE:
        this.walkable = false
        this.color = CORNER_COLOR
        break
      case SPAWNER_STATE:
        this.isSpawner = true
        this.color = SPAWNER_COLOR
        break
      case PLAYER_SPAWNPOINT_STATE:
        this.isSpawnpoint = true
      default:
        break
    }
  }

  reset = () => {
    this.gCost = 0
    this.hCost = 0

    this.parent = null
  }

  update = () => {}

  draw = graphics => {
    graphics.beginFill(this.color)

    graphics.drawRect(this.x, this.y, TILE_WIDTH, TILE_WIDTH)

    graphics.endFill()
  }

  get fCost() {
    return this.gCost + this.hCost
  }
}
