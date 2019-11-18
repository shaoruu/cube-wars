const switchButtonDOM = document.getElementById('gamemode')
const godModeDOM = document.getElementById('god-mode')

const EASY = 'EASY'
const REGULAR = 'REGULAR'
const HARD = 'HARD'

const ON = 'ON'
const OFF = 'OFF'

const possibilities = [EASY, REGULAR, HARD]
let index = 0

const godPossibilities = [OFF, ON]
let godIndex = 0

const difficulty = localStorage.getItem('gamemode')
if (!difficulty) localStorage.setItem('gamemode', EASY)
else {
  index = possibilities.findIndex(ele => ele === difficulty)
  switchButtonDOM.innerHTML = difficulty
}

const godMode = localStorage.getItem('god-mode')
if (!godMode) localStorage.setItem('god-mode', OFF)
else {
  godIndex = godPossibilities.findIndex(ele => ele === godMode)
  godModeDOM.innerHTML = godMode
}

switchButtonDOM.onclick = () => {
  index++
  if (index >= possibilities.length) {
    index = 0
  }

  const diff = possibilities[index]
  localStorage.setItem('gamemode', diff)

  switchButtonDOM.innerHTML = diff
}

godModeDOM.onclick = () => {
  godIndex++
  if (godIndex >= godPossibilities.length) {
    godIndex = 0
  }

  const godMode1 = godPossibilities[godIndex]
  localStorage.setItem('god-mode', godMode1)

  godModeDOM.innerHTML = godMode1
}
