import { nanograms } from '../nanogram/nanograms-collection.js'

const gameSection = document.getElementById('game')

// Создаем меню для выбора сложности и картинок
const section = document.createElement('section')
section.classList.add('level-menu')

const label = document.createElement('label')
label.textContent = 'Choose a level: '

// Легкий уровень игры
export const selectEasy = document.createElement('select')
selectEasy.id = 'levelEasy'
selectEasy.classList.add('level-menu__list')

const defaultEasyOption = document.createElement('option')
defaultEasyOption.textContent = 'easy'
defaultEasyOption.value = 'easy'
selectEasy.appendChild(defaultEasyOption)

// Средний уровень игры
export const selectMedium = document.createElement('select')
selectMedium.id = 'levelMedium'
selectMedium.classList.add('level-menu__list')

const defaultMediumOption = document.createElement('option')
defaultMediumOption.textContent = 'medium'
defaultMediumOption.value = 'medium'
selectMedium.appendChild(defaultMediumOption)

// Сложный уровень игры
export const selectHard = document.createElement('select')
selectHard.id = 'levelMedium'
selectHard.classList.add('level-menu__list')

const defaultHardOption = document.createElement('option')
defaultHardOption.textContent = 'hard'
defaultHardOption.value = 'hard'
selectHard.appendChild(defaultHardOption)

// Получаем названия картинок по уровням сложности
for (const item of nanograms) {
  if (item.level === 'easy') {
    addOption(item, selectEasy)
  } else if (item.level === 'medium') {
    addOption(item, selectMedium)
  } else if (item.level === 'hard') {
    addOption(item, selectHard)
  }
}

function addOption(item, select) {
  const option = document.createElement('option')
  option.textContent = `${item.name}`
  option.value = `${item.name}`
  select.appendChild(option)
}

section.appendChild(label)
section.appendChild(selectEasy)
section.appendChild(selectMedium)
section.appendChild(selectHard)
gameSection.appendChild(section)
