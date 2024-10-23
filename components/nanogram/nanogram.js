import * as selects from '../level/level.js'
import { createNanogramField } from './nanogram-template.js'
import { nanograms } from './nanograms-collection.js'
import { addEmptyNanogram } from './emptyField.js'
import { resetTimer } from '../timer/timer.js'

const gameSection = document.getElementById('game')
export const section = document.createElement('section')
section.classList.add('nanogram')
section.id = 'nanogram'
section.appendChild(addEmptyNanogram())
gameSection.appendChild(section)

export let currentGameName = null
export let currentGameInfo = null

const selectsArray = [
  selects.selectEasy,
  selects.selectMedium,
  selects.selectHard,
]

// Получаем название выбранной картинки
selectsArray.forEach((item) =>
  item.addEventListener('change', (event) => {
    currentGameName = event.target.value
    currentGameInfo = getGameInfo(currentGameName)
    replaceNanogram(section)
  }),
)

// Получаем информацию о поле по выбранному названию
function getGameInfo(name) {
  for (const item of nanograms) {
    if (item.name === name) {
      return item
    }
  }
}

// При выборе новой картинки заменяю поле для игры
function replaceNanogram(section) {
  if (section.children.length === 1) section.textContent = ''
  if (
    currentGameName === 'easy' ||
    currentGameName === 'medium' ||
    currentGameName === 'hard'
  ) {
    resetTimer()
    section.appendChild(addEmptyNanogram())
  } else {
    resetTimer()
    section.appendChild(createNanogramField(currentGameInfo))
  }
}
