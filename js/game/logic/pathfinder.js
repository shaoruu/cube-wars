class PathFinder {
  static findPath(game, monster) {
    const worldRef = game.world
    const playerRef = game.player

    const startNode = worldRef.getNodeFromRC(monster.r, monster.c)
    const targetNode = worldRef.getNodeFromRC(playerRef.r, playerRef.c)

    const openSet = []
    const closedSet = []
    openSet.push(startNode)

    while (openSet.length > 0) {
      let node = openSet[0],
        index = 0
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].fCost <= node.fCost) {
          if (openSet[i].hCost < node.hCost) {
            node = openSet[i]
            index = i
          }
        }
      }

      openSet.splice(index, 1)
      closedSet.push(node)

      if (equalNodes(node, targetNode)) {
        return retracePath(startNode, targetNode)[0]
      }

      const neighbors = worldRef.getNeighborNodes(node)

      neighbors.forEach(neighbor => {
        if (
          isDiagonallyTrapped(worldRef, node, neighbor) ||
          !neighbor.walkable ||
          closedSet.includes(neighbor)
        ) {
          return
        }

        let newCostToNeighbor = node.gCost + getNodalDistance(node, neighbor)

        if (newCostToNeighbor < neighbor.gCost || !openSet.includes(neighbor)) {
          neighbor.gCost = newCostToNeighbor
          neighbor.gCost = newCostToNeighbor
          neighbor.hCost = getNodalDistance(neighbor, targetNode)
          neighbor.parent = node

          if (!openSet.includes(neighbor)) openSet.push(neighbor)
        }
      })
    }

    return null
  }
}
