const gameSection = document.getElementById('game')

const themeBlock = document.createElement('section')
themeBlock.classList.add('theme-block')

const buttonTheme = document.createElement('button')
buttonTheme.classList.add('ordinary-style__button')
buttonTheme.textContent = 'On dark theme'

themeBlock.appendChild(buttonTheme)
gameSection.appendChild(themeBlock)

buttonTheme.addEventListener('click', changeTheme)

function changeTheme() {
  const currentTheme = document.getElementById('theme')

  if (currentTheme.href.includes('light-theme')) {
    currentTheme.href = './styles/dark-theme.css'
    buttonTheme.textContent = 'On light theme'
  } else {
    currentTheme.href = './styles/light-theme.css'
    buttonTheme.textContent = 'On dark theme'
  }
}
