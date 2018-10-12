document.onkeypress = getPrintableKey
document.onkeydown = getUniKey

const terminal = document.getElementById('terminal')
const history = []
let curPos = 0
let lastLine = terminal.lastElementChild
let i = 0
let latest = 0

const blink = document.createElement('span')
blink.classList.add('blink')

history[i] = []
updateScreen()

function getPrintableKey (e) {
  if (e.key === 'Enter') return
  checkEditing()
  history[i].splice(curPos, 0, e.key)
  curPos++
  updateScreen()
}

// copy history command to newest for editing
function checkEditing () {
  if (i !== latest) {
    history[latest] = [...history[i]]
    i = latest
  }
}

function getUniKey (e) {
  parseKey(e)
}

function updateScreen () {
  lastLine.innerHTML = ''
  lastLine.appendChild(
    document.createTextNode(history[i].slice(0, curPos).join(''))
  )
  lastLine.appendChild(blink)
  lastLine.appendChild(
    document.createTextNode(
      history[i].slice(curPos, history[i].length).join('')
    )
  )
  terminal.scrollTop = terminal.scrollHeight
}

function parseKey (e) {
  switch (e.key) {
    case 'Enter':
      const s = history[i].join('')
      // do not create new index when using old command
      if (i !== latest || history[i].length === 0) {
        i = latest
      } else {
        i = latest = history.length
      }
      history[i] = []
      curPos = 0
      parseCommand(s)
      break
    case 'Backspace':
      if (curPos === 0) return
      checkEditing()
      history[i].splice(curPos - 1, 1)
      curPos--
      break
    case 'ArrowUp':
      e.preventDefault()
      if (i <= 0) return
      i--
      curPos = history[i].length
      break
    case 'ArrowDown':
      e.preventDefault()
      if (i >= history.length - 1) break
      i++
      curPos = history[i].length
      break
    case 'ArrowLeft':
      if (curPos <= 0) return
      curPos--
      break
    case 'ArrowRight':
      if (curPos >= history[i].length) return
      curPos++
      break
    default:
      // return to prevent updateScreen to be called
      return
  }
  updateScreen()
}

function parseCommand (s) {
  const [cmd, ...args] = s.split(' ')
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
  let newLine = isOutput
    ? document.createElement('div')
    : document.createElement('pre')
  newLine.innerHTML = msg
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
          Name: Panot Wongkhot<br>
          Birth date: 19/10/1992<br>
          Language: Javascript, Go<br>
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
          07/7 - 22/7/ 2018 Codecamp TH #2 (React + Redux Instructor)<br>
        `)
      break
    default:
      output('file not found.')
  }
}

function ls (...args) {
  output('profile contact activities projects')
}
