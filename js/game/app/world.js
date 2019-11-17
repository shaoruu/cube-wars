class World {
  constructor(game) {
    this.initMembers(game)
  }

  initMembers = game => {
    this.game = game

    this.graphics = new PIXI.Graphics()

    this.nodes = []
    this.spawnerNodes = []
    for (let i = 0; i < DIMENSION; i++) {
      const newNodeArray = []
      for (let j = 0; j < DIMENSION; j++) {
        const newNode = new Node(DEFAULT_BIG_MAP[i][j], i, j)
        newNodeArray.push(newNode)

        if (newNode.isSpawner) this.spawnerNodes.push(newNode)
        else if (newNode.isSpawnpoint) this.spawnpoint = newNode

        if (newNode.rigidBody) Matter.World.add(game.physicsEngine.world, newNode.rigidBody)
      }
      this.nodes.push(newNodeArray)
    }

    this.position = { x: 0, y: 0 }

    this.draw()
    this.sprite = new PIXI.Sprite(graphicsToTexture(this.graphics, game.getRenderer()))
    this.game.getStage().addChild(this.sprite)
  }

  update = delta => {
    const { x, y } = mapGlobalToPlayerVP(this.position, this.game.player)

    this.sprite.x = x
    this.sprite.y = y
  }

  draw = () => {
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        this.nodes[i][j].draw(this.graphics)
      }
    }
  }

  getSpawnpoint = () => this.spawnpoint

  getRandomSpawner = () => this.spawnerNodes[Math.floor(this.spawnerNodes.length * Math.random())]

  getNeighborNodes = node => {
    const neighbors = []

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue

        let checkR = node.r + i
        let checkC = node.c + j

        if (rcWithinBounds(checkR, checkC)) {
          neighbors.push(this.getNodeFromRC(checkR, checkC))
        }
      }
    }

    return neighbors
  }

  getNodeFromRC = (r, c) => {
    try {
      return this.nodes[r][c]
    } catch (e) {
      return null
    }
  }
}
