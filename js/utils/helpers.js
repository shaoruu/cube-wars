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
