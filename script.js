document.addEventListener('keydown', getKey)

const terminal = document.getElementById('terminal')
let input = ''

function getKey (e) {
  parseKey(e.key)
  terminal.lastElementChild.innerHTML = input + '<span></span>'
  updateScroll()
}

function updateScroll () {
  terminal.scrollTop = terminal.scrollHeight
}

function parseKey (key) {
  switch (key) {
    case 'Enter':
      const newLine = document.createElement('div')
      const oldLine = terminal.lastElementChild.innerHTML
      terminal.lastElementChild.innerHTML = oldLine.slice(0, oldLine.length - '<span></span>'.length)
      terminal.appendChild(newLine)
      input = ''
      break
    case 'Backspace':
      input = input.slice(0, input.length - 1)
      break
    default:
      input = input + key
  }
}
