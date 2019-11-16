const app = new PIXI.Application({
  width: 640,
  autoResize: true,
  height: 360,
  resolution: devicePixelRatio
})
document.body.appendChild(app.view)

const circle = new PIXI.Graphics()
circle.beginFill(0x5cafe2)
circle.drawCircle(0, 0, 80)
circle.x = 320
circle.y = 180

app.stage.addChild(circle)

window.addEventListener('resize', resize)

// Resize function window
function resize() {
  // Resize the renderer
  app.renderer.resize(window.innerWidth, window.innerHeight)
}

resize()
