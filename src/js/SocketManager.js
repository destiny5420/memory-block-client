/* eslint-disable camelcase */

const sc_message = function (data) {
  const element = document.createElement('div')
  element.classList.add('message')
  element.innerHTML = `
  <p class="meta">
    <span class="user-name">${data.username}</span>
    <span class="time">${data.time}</span></p>
  <p class="text">
    ${data.text}
  </p>`

  document.querySelector('.chat .wrap').appendChild(element)
}

function scCommand(command, data) {
  console.log(`[SC - ${command}] / data: `, data)
  switch (command) {
    case 'message':
      sc_message(data)
      break
    default:
      break
  }
}

function protocolFromServer(command) {
  this.socket.on(command, (data) => {
    scCommand(command, data)
  })
}

function SocketManager() {
  this.socket = io('http://localhost:9898/', { transport: ['websocket'] })

  const sc_command = protocolFromServer.bind(this)
  // sc event
  sc_command('message', sc_message)

  // // cs event
  // this.csCommand('chatMessage', { message: 'Hi, testing' })
}

SocketManager.prototype.csCommand = function (command, data) {
  console.log(`[CS - ${command}] / data: `, data)
  switch (command) {
    case 'chatMessage':
      this.socket.emit(command, data)
      break
    default:
      console.error(`can't find ${command} command from CS command `)
      break
  }
}

export default SocketManager
