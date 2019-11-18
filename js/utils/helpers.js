function graphicsToTexture(gr, renderer) {
  return renderer.generateTexture(gr)
}

function mapGlobalToPlayerVP(globalPos, player) {
  const { x, y } = globalPos

  const { x: pGlobalX, y: pGlobalY } = player.globalPos
  const { x: pWindowX, y: pWindowY } = player.windowPos

  const roomGDeltaXToPlayer = x - pGlobalX
  const roomGDeltaYToPlayer = y - pGlobalY

  return {
    x: pWindowX + roomGDeltaXToPlayer,
    y: pWindowY + roomGDeltaYToPlayer
  }
}

function globalPosToGridPos(globalPos) {
  const { x, y } = globalPos

  return { c: globalCoordToGridCoord(x), r: globalCoordToGridCoord(y) }
}

function globalCoordToGridCoord(number) {
  return Math.floor(number / TILE_WIDTH)
}

function getZombieCount(level) {
  let base, incr
  switch (getDifficulty()) {
    case EASY:
      base = ZOMBIE_EASY_BASE_COUNT
      incr = ZOMBIE_EASY_INCR_COUNT
      break
    case REGULAR:
      base = ZOMBIE_REGULAR_BASE_COUNT
      incr = ZOMBIE_REGULAR_INCR_COUNT
      break
    case HARD:
      base = ZOMBIE_HARD_BASE_COUNT
      incr = ZOMBIE_HARD_INCR_COUNT
      break
  }

  return (level - 1) * incr + base
}

function equalNodes(node1, node2) {
  return node1.r === node2.r && node1.c === node2.c
}

function retracePath(startNode, endNode) {
  const path = []
  let currNode = endNode

  while (!equalNodes(startNode, currNode)) {
    path.unshift(currNode)
    currNode = currNode.parent
  }

  return path
}

function rcWithinBounds(checkR, checkC) {
  return checkR >= 0 && checkR < DIMENSION && checkC >= 0 && checkC < DIMENSION
}

function getNodalDistance(node1, node2) {
  // let distR = Math.abs(node1.r - node2.r)
  // let distC = Math.abs(node1.c - node2.c)

  // if (distR > distC) return Math.round(14 * distC + 10 * (distR - distC))
  // return Math.round(14 * distR + 10 * (distC - distR))
  return Math.abs(node1.r - node2.r) + Math.abs(node1.c - node2.c)
}

function isDiagonallyTrapped(world, node, neighbor) {
  const dR = neighbor.r - node.r
  const dC = neighbor.c - node.c

  if (dR !== 0 && dC !== 0) {
    const node1 = world.getNodeFromRC(node.r + dR, node.c)
    const node2 = world.getNodeFromRC(node.r, node.c + dC)

    if (!node1.walkable && !node2.walkable) return true
  }

  return false
}

function getRandomZombieAcc() {
  return ZOMBIE_MIN_ACC + Math.random(ZOMBIE_MAX_ACC - ZOMBIE_MIN_ACC)
}

function setScoreDOM(score) {
  scoreDOM.innerHTML = `Score: ${score}`
}

function setWeaponDOM(name) {
  weaponDOM.innerHTML = name
}

function setLvlDOM(lvl) {
  lvlDOM.innerHTML = `Level: ${lvl}`
}

function setZBDOM(count) {
  zbLeftDOM.innerHTML = `Zombies: ${count}`
}

function activateGoalDOM() {
  goalsDOM.style.top = '50%'
}

function deactivateGoalDOM() {
  goalsDOM.style.top = '-50%'
}

function getDifficulty() {
  const difficulty = localStorage.getItem('gamemode')
  return difficulty || EASY
}

function isGodMode() {
  const godMode = localStorage.getItem('god-mode')
  if (godMode) return godMode === ON
  return false
}
