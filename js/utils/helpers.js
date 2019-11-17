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
