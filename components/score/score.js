import { getBestResults } from '../modal/modal.js'

const gameSection = document.getElementById('game')

const scoreBlock = document.createElement('section')
scoreBlock.classList.add('score-block')

const scoreButton = document.createElement('button')
scoreButton.classList.add('ordinary-style__button')
scoreButton.textContent = 'Score'
scoreButton.addEventListener('click', appearScoreModalWindow)

function appearScoreModalWindow() {
  const modalWindow = document.createElement('div')
  modalWindow.classList.add('modal-window')

  const modalText = document.createElement('span')
  modalText.classList.add('modal-window__text')
  modalText.textContent = `Yours best results:`

  const modalResults = document.createElement('div')
  modalResults.classList.add('modal-window__result')

  const bestResults = getBestResults()
  for (let i = 0; i < bestResults.length; i++) {
    const result = document.createElement('p')
    result.classList.add('modal-window__result__item')
    result.textContent = bestResults[i].result
    modalResults.appendChild(result)
  }

  const modalButton = document.createElement('button')
  modalButton.classList.add('modal-window__button')
  modalButton.textContent = 'Close'
  modalButton.addEventListener(
    'click',
    () => (modalWindow.style.display = 'none'),
  )

  modalWindow.appendChild(modalText)
  modalWindow.appendChild(modalResults)
  modalWindow.appendChild(modalButton)
  gameSection.appendChild(modalWindow)
}

scoreBlock.appendChild(scoreButton)
gameSection.appendChild(scoreBlock)
