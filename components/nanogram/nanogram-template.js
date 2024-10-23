import { appearModalWindow } from '../modal/modal.js'
import { timerInterval, startTimer } from '../timer/timer.js'

const addBlackColorAudio = new Audio('./assets/audio/click3.mp3')
const addCrossAudio = new Audio('./assets/audio/click1.mp3')
const addEmptyAudio = new Audio('./assets/audio/click2.mp3')

let correctValues = null
let stateResult = null
let playingField = null

export function changeValue() {
  // Все ячейки из игрового поля
  const elements = [...playingField.children]
  // Сохраняем значение нажатой ячейки (0 или 1)
  const cellValue = +this.dataset.value
  // Сохраняем индекс нажатой ячейки
  const cellIndex = elements.indexOf(this)
  // Меняем при каждоим нажатии 'false' на 'true', чтобы
  // в дальнейшем сравнивать с массивом correctValues
  // так как массив состоит только из 0 и 1 мы можем
  // делать проверку на равенство 'true' == 1 и 'false' == 0
  stateResult[cellIndex] =
    (cellValue === 1 || cellValue === 0) && stateResult[cellIndex] === true
      ? false
      : true
  compareValues(correctValues, stateResult)
    ? setTimeout(appearModalWindow, 500)
    : false
  // Меняем цвет ячейки и удаляем 'X', если он есть
  this.textContent = ''
  this.classList.toggle('nanorgam__field__cell-black')
  this.classList[1] === 'nanorgam__field__cell-black'
    ? addBlackColorAudio.play()
    : addEmptyAudio.play()
  if (!timerInterval) {
    startTimer()
  }
}

export function compareValues(correct, answer) {
  let result = null
  for (let i = 0; i < correct.length; i++) {
    if (correct[i] == answer[i]) {
      result = true
    } else {
      result = false
      break
    }
  }
  return result
}

// Ставим крестик при правом клике
export function addCross() {
  if (!timerInterval) {
    startTimer()
  }
  event.preventDefault()
  addCrossAudio.play()
  this.textContent = this.textContent !== 'X' ? 'X' : ''
  this.classList.remove('nanorgam__field__cell-black')
}

// Шаблон поля
export function createNanogramField(info) {
  const nanogramInfo = info

  const field = document.createElement('div')
  field.classList.add('nanorgam__field')
  field.id = 'field'

  const emptyField = document.createElement('div')
  emptyField.classList.add('nanorgam__field__empty')
  field.appendChild(emptyField)

  const hint = document.createElement('p')
  hint.classList.add('nanorgam__field__empty__hint')
  hint.textContent = nanogramInfo.name

  emptyField.appendChild(hint)

  // Получаем максимальное количество среди верхних,
  // левых подсказок и число повторений ячеек для грид разметки
  let [numberOfTopHints, numberOfLeftHints, repeat] = getNumberOfCells(
    nanogramInfo.topHint,
    nanogramInfo.leftHint,
    nanogramInfo.level,
  )

  const topHintField = document.createElement('div')
  topHintField.classList.add('nanorgam__field__top-hint')
  for (let i = 0; i < numberOfTopHints; i++) {
    const cell = document.createElement('div')
    cell.classList.add('nanorgam__field__cell')
    topHintField.appendChild(cell)
  }
  addTopHint(topHintField, nanogramInfo.topHint, nanogramInfo.level)
  field.appendChild(topHintField)

  const leftHintField = document.createElement('div')
  leftHintField.classList.add('nanorgam__field__left-hint')
  leftHintField.style.gridTemplateColumns = `repeat(${repeat}, 1fr)`
  for (let i = 0; i < numberOfLeftHints; i++) {
    const cell = document.createElement('div')
    cell.classList.add('nanorgam__field__cell')
    leftHintField.appendChild(cell)
  }
  addLeftHint(leftHintField, nanogramInfo.leftHint, repeat)
  field.appendChild(leftHintField)

  // Получаем значения из готового шаблона в общий массив и присваиваем
  // каждой ячейке 'data-value' для дальнейшей проверки результата - менять
  // на черный/белый цвет
  correctValues = nanogramInfo.nanogram.flat()
  stateResult = correctValues.map(() => false)
  playingField = document.createElement('div')
  playingField.classList.add('nanorgam__field__playing-field')
  for (let i = 0; i < correctValues.length; i++) {
    const cell = document.createElement('div')
    cell.addEventListener('click', changeValue)
    cell.addEventListener('contextmenu', addCross)
    cell.setAttribute('data-value', `${correctValues[i]}`)
    cell.classList.add('nanorgam__field__cell')
    playingField.appendChild(cell)
  }
  field.appendChild(playingField)

  return field
}

function getNumberOfCells(topHint, leftHint, level) {
  const top = topHint.map((item) => item.length)
  const left = leftHint.map((item) => item.length)
  if (level === 'easy')
    return [Math.max(...top) * 5, Math.max(...left) * 5, Math.max(...left)]
  if (level === 'medium')
    return [Math.max(...top) * 10, Math.max(...left) * 10, Math.max(...left)]
  if (level === 'hard')
    return [Math.max(...top) * 15, Math.max(...left) * 15, Math.max(...left)]
}

// Заполняем блок верхних подсказок:
// - проходим по каждому массиву с подсказками в hintsCollection
// и проверяем кол-во подсказок в нем;
// - если внутри есть только одна подсказка, значит мы должны рассположить
// ее ближе к нашему полю, добавляем определенный шаг(в зависимости от уровня
// сложности, так как при разных уровнях кол-во ячеек разное!!!) и переходим
// к ячейке, которая находится под актуальной;
// - если у нас есть больше одной подсказки в подмассиве, значит мы заполняем
// все ячейки значениями из подмассива, также параллельно делая шаг,
// чтобы значения были друг под другом
function addTopHint(elements, hints, level) {
  const elementsCollection = elements.children
  const hintsCollection = hints
  for (let i = 0; i < hintsCollection.length; i++) {
    let index = i
    if (hintsCollection[i].length === 1) {
      const span = document.createElement('span')
      span.textContent = hintsCollection[i]
      elementsCollection[i + hintsCollection.length].appendChild(span)
    } else {
      const item = hintsCollection[i]
      for (let j = 0; j < item.length; j++) {
        const span = document.createElement('span')
        span.textContent = `${item[j]}`
        elementsCollection[i].appendChild(span)
        if (level === 'easy') i += 5
        if (level === 'medium') i += 10
        if (level === 'hard') i += 15
      }
      i = index
    }
  }
}

// Заполняем блок левых подсказок:
// - проходим по каждому массиву с подсказками в hintsCollection
// и проверяем кол-во подсказок в нем;
// - если внутри есть только одна подсказка, значит мы должны рассположить
// ее ближе к нашему полю, добавляем определенный шаг(умножаем актуальный
// индекс на максимальную длинну подмассива и добавляем дополнительный индекс,
// чтобы поставить элемент на его место);
// - если у нас есть больше одной подсказки в подмассиве, значит мы заполняем
// все ячейки значениями из подмассива, также добавляем определенный шаг через
// умножение на два и добавлением нуля или единицы для расположения каждой подсказки
function addLeftHint(elements, hints, maxLength) {
  const elementsCollection = elements.children
  const hintsCollection = hints

  for (let i = 0; i < hintsCollection.length; i++) {
    if (hintsCollection[i].length === 1) {
      const span = document.createElement('span')
      span.textContent = hintsCollection[i]
      elementsCollection[i * maxLength + (maxLength - 1)].appendChild(span)
    } else {
      let item = hintsCollection[i] // [1, 1]
      for (let j = 0; j < item.length; j++) {
        const span = document.createElement('span')
        span.textContent = item[j]
        if (item.length >= maxLength)
          elementsCollection[i * maxLength + j + 0].appendChild(span)
        if (item.length < maxLength)
          elementsCollection[i * maxLength + j + 1].appendChild(span)
      }
    }
  }
}
