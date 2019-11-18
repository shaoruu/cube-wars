const switchButtonDOM = document.getElementById('gamemode')

const EASY = 'EASY'
const REGULAR = 'REGULAR'
const HARD = 'HARD'

const possibilities = [EASY, REGULAR, HARD]
let index = 0

const difficulty = localStorage.getItem('gamemode')
if (!difficulty) localStorage.setItem('gamemode', EASY)
else {
  index = possibilities.findIndex(ele => ele === difficulty)
  switchButtonDOM.innerHTML = difficulty
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
