const gameSection = document.getElementById('game')

const timerBlock = document.createElement('section')
timerBlock.classList.add('timer-block')

const timer = document.createElement('p')
timer.textContent = '00:00'
timer.classList.add('timer-block__time')

timerBlock.appendChild(timer)
gameSection.appendChild(timerBlock)

export let timerInterval
export let seconds = 0
export let minutes = 0

function updateTimer() {
  timer.textContent = `${addZero(minutes)}:${addZero(seconds)}`
}

function addZero(value) {
  return value < 10 ? `0${value}` : value
}

export function startTimer() {
  timerInterval = setInterval(() => {
    seconds++
    if (seconds === 60) {
      seconds = 0
      minutes++
    }
    updateTimer()
  }, 1000)
}

export function stopTimer() {
  clearInterval(timerInterval)
}

export function resetTimer() {
  stopTimer()
  timerInterval = null
  seconds = 0
  minutes = 0
  updateTimer()
}
