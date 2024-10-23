import { selectEasy, selectMedium, selectHard } from '../level/level.js'
import { nanograms } from '../nanogram/nanograms-collection.js'

const buttonsBlock = document.getElementsByClassName('buttons-block')

const randomButton = document.createElement('button')
randomButton.classList.add('ordinary-style__button')
randomButton.textContent = 'Random game!'

buttonsBlock[0].appendChild(randomButton)

randomButton.addEventListener('click', getRandomGame)

function getRandomGame() {
  let randomIndex = getRandomIndex()
  const randomItem = nanograms[randomIndex]
  if (randomItem.level === 'easy') chooseNanogram(selectEasy, randomIndex)
  if (randomItem.level === 'medium') chooseNanogram(selectMedium, randomIndex)
  if (randomItem.level === 'hard') chooseNanogram(selectHard, randomIndex)
}

function getRandomIndex() {
  const minIndex = 1
  const maxIndex = nanograms.length
  return Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex
}

function chooseNanogram(select, index) {
  console.log(index)
  select.selectedIndex = index
  const event = new Event('change', { bubbles: true })
  select.dispatchEvent(event)
}
