import 'main.scss'
import SocketManager from './SocketManager'

const socketManager = new SocketManager()

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault()

  const msg = e.target.elements.msg.value

  socketManager.csCommand('chatMessage', { msg })

  e.target.elements.msg.value = ''
})
