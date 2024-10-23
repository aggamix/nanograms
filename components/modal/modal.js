import { seconds, minutes, stopTimer } from '../timer/timer.js'
import { currentGameInfo } from '../nanogram/nanogram.js'

const gameSection = document.getElementById('game')
const winAudio = new Audio('./assets/audio/win.mp3')

let time
let result

// Добавляю массив с результатми в localStorage
function saveBestResults(results) {
  localStorage.setItem('bestResults', JSON.stringify(results))
}

// Достаю массив с результатми с localStorage
export function getBestResults() {
  const storedResults = localStorage.getItem('bestResults')
  return storedResults ? JSON.parse(storedResults) : []
}

// Обновляю и отображаю списсок лучших результатов
function updateBestResults(result) {
  let bestResults = getBestResults()
  const resultTime = parseInt(result.split('time: ')[1], 10)
  bestResults.push({ result, time: resultTime })
  bestResults.sort((a, b) => a.time - b.time)
  bestResults.splice(5)
  saveBestResults(bestResults)
  return bestResults
}

export function appearModalWindow() {
  stopTimer()

  time = minutes != 0 ? minutes * 60 + seconds : minutes + seconds
  result = `Level: ${currentGameInfo.level}, name: ${currentGameInfo.name}, time: ${time}`

  const modalWindow = document.createElement('div')
  modalWindow.classList.add('modal-window')

  const modalText = document.createElement('span')
  modalText.classList.add('modal-window__text')
  modalText.textContent = `Great! You have solved the nonogram in ${time} seconds!`

  winAudio.play()

  const modalButton = document.createElement('button')
  modalButton.classList.add('modal-window__button')
  modalButton.textContent = 'Continue'
  modalButton.addEventListener('click', () => {
    modalWindow.style.display = 'none'
    updateBestResults(result)
  })

  modalWindow.appendChild(modalText)
  modalWindow.appendChild(modalButton)
  gameSection.appendChild(modalWindow)
}
