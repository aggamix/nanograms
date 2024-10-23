const buttonsBlock = document.getElementsByClassName('buttons-block')

const solveButton = document.createElement('button')
solveButton.classList.add('ordinary-style__button')
solveButton.textContent = 'Solution'

buttonsBlock[0].appendChild(solveButton)

solveButton.addEventListener('click', solveNanogram)

function solveNanogram() {
  const elements = document.querySelectorAll(
    '.nanorgam__field__playing-field .nanorgam__field__cell',
  )

  let currentIndex = 0

  const intervalId = setInterval(() => {
    if (currentIndex >= elements.length) {
      clearInterval(intervalId)
      return
    }

    const element = elements[currentIndex]
    const cellValue = +element.dataset.value

    if (cellValue === 1) element.classList.add('nanorgam__field__cell-black')

    currentIndex++
  }, 300)
}
