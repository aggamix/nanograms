export function addEmptyNanogram() {
  const section = document.createElement('section')
  section.classList.add('nanogram')

  const field = document.createElement('div')
  field.classList.add('nanorgam__field')

  const emptyField = document.createElement('div')
  emptyField.classList.add('nanorgam__field__empty')
  field.appendChild(emptyField)

  const topHintField = document.createElement('div')
  topHintField.classList.add('nanorgam__field__top-hint')
  for (let i = 0; i < 10; i++) {
    const cell = document.createElement('div')
    cell.classList.add('nanorgam__field__cell')
    topHintField.appendChild(cell)
  }
  field.appendChild(topHintField)

  const leftHintField = document.createElement('div')
  leftHintField.classList.add('nanorgam__field__left-hint')
  leftHintField.style.gridTemplateColumns = `repeat(${2}, 1fr)`
  for (let i = 0; i < 10; i++) {
    const cell = document.createElement('div')
    cell.classList.add('nanorgam__field__cell')
    leftHintField.appendChild(cell)
  }
  field.appendChild(leftHintField)

  const playingField = document.createElement('div')
  playingField.classList.add('nanorgam__field__playing-field')
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div')
    cell.classList.add('nanorgam__field__cell')
    playingField.appendChild(cell)
  }
  field.appendChild(playingField)

  return section.appendChild(field)
}
