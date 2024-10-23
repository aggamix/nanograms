import { createNanogramField } from '../nanogram/nanogram-template.js'
import {
  section,
  currentGameName,
  currentGameInfo,
} from '../nanogram/nanogram.js'
import { resetTimer } from '../timer/timer.js'

const gameSection = document.getElementById('game')

const buttonsBlock = document.createElement('section')
buttonsBlock.classList.add('buttons-block')

const resetButton = document.createElement('button')
resetButton.classList.add('ordinary-style__button')
resetButton.textContent = 'Reset game'

buttonsBlock.appendChild(resetButton)
gameSection.appendChild(buttonsBlock)

resetButton.addEventListener('click', resetGame)

function resetGame() {
  if (section.children.length === 1 && currentGameName != null)
    section.textContent = ''
  section.appendChild(createNanogramField(currentGameInfo))
  resetTimer()
}
