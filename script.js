document.addEventListener('keydown', getKey)

const terminal = document.getElementById('terminal')
let lastLine = terminal.lastElementChild
let input = ''

function getKey (e) {
  parseKey(e.key)
  updateScroll()
}

function updateScroll () {
  terminal.scrollTop = terminal.scrollHeight
}

function parseKey (key) {
  switch (key) {
    case 'Enter':
      const inputArgs = input.split(' ')
      parseCmd(...inputArgs)
      input = ''
      break
    case 'Backspace':
      input = input.slice(0, input.length - 1)
      break
    default:
      input = input + key
  }
  lastLine.innerHTML = input + '<span></span>'
}

function parseCmd (cmd, ...args) {
  console.log(args)
  switch (cmd) {
    case 'help':
      output(`
        <div class="help">
          <div>ls</div><div>list directory contents</div>
          <div>cat</div><div>concatenate and print files</div>
        </div>
      `)
      break
    case 'ls':
      output('profile contact projects')
      break
    case 'cat':
      switch (args[0]) {
        case 'profile':
          output('name: Panot Wongkhot')
          break
        case 'contact':
          output('panot.wongkhot@gmail.com')
          break
        default:
          output('file not found.')
      }
      break
    case '':
      println('')
      break
    default:
      output('Unknow command')
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
