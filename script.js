document.onkeypress = getPrintableKey
document.onkeydown = getUniKey

const terminal = document.getElementById('terminal')
const history = []
let historyIndex = 0
let lastLine = terminal.lastElementChild
let input = ''

function getPrintableKey (e) {
  if (e.key === 'Enter') return
  input = input + e.key
  updateScreen()
}

function getUniKey (e) {
  parseKey(e)
}

function updateScreen () {
  lastLine.innerHTML = input.replace(/ /g, '&nbsp;') + '<span></span>'
  updateScroll()
}

function updateScroll () {
  terminal.scrollTop = terminal.scrollHeight
}

function parseKey (e) {
  switch (e.key) {
    case 'Enter':
      if (input !== history[history.length - 1]) {
        historyIndex = history.push(input) - 1
      }
      const inputArgs = input.trim().split(' ')
      parseCmd(...inputArgs)
      input = ''
      break
    case 'Backspace':
      input = input.slice(0, input.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      if (history.length === 0) return
      input = history[historyIndex--]
      if (historyIndex < 0) historyIndex = 0
      break
    case 'ArrowDown':
      e.preventDefault()
      if (history.length === 0) return
      historyIndex++
      if (historyIndex > history.length - 1) {
        historyIndex = history.length - 1
        input = ''
      } else {
        input = history[historyIndex]
      }
      break
    default:
  }
  updateScreen()
}

function parseCmd (cmd, ...args) {
  switch (cmd) {
    case 'help':
      help(...args)
      break
    case 'ls':
      ls(...args)
      break
    case 'cat':
      cat(...args)
      break
    case '':
      println('')
      break
    default:
      output(`Unknow command ${cmd}`)
  }
}

function println (msg, isOutput = false) {
  lastLine.innerHTML = lastLine.innerHTML.replace('<span></span>', '')
  let newLine = document.createElement('div')
  newLine.innerHTML = msg
  if (isOutput) {
    newLine.className = 'output'
  }
  terminal.appendChild(newLine)
  lastLine = newLine
}

function output (msg) {
  println(msg, true)
  println('')
}

// cmd function
function help () {
  output(`
  <div class="help">
    <div>ls</div><div>list directory contents</div>
    <div>cat</div><div>concatenate and print files</div>
  </div>
`)
}

function cat (...args) {
  switch (args[0]) {
    case 'profile':
      output(`
          name: Panot Wongkhot<br>
          birth date: 19/10/1992<br>
          language: Javascript, Go<br>
          Hobbie: Guitar, Song Composing<br>
          Current job: Acoshift's subordinate
        `)
      break
    case 'contact':
      output('panot.wongkhot@gmail.com')
      break
    case 'activities':
      output(`
          18/12/2017 - 16/3/2018 Codecamp TH #1 Graduated with All Homework Done<br>
          25/3 - 8/4/ 2018 Front-End Bootcamp สวทน (React + Redux Instructor)<br>
        `)
      break
    default:
      output('file not found.')
  }
}

function ls (...args) {
  output('profile contact activities projects')
}
