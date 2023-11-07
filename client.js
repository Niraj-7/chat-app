const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".msg-container")
var audio = new Audio("Resources/Message - 1 Second ! Notification.mp3");


const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    // messageElement.classList.add('right');
    console.log(messageElement.classList);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
    
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

let names = prompt("enter your name to join");
socket.emit('new-user-joined', names);

socket.on('user-joined', names => {
    append(`${names} joined the chat`, 'left');
})

socket.on('receive', (data) => {
    append(`${data.names}: ${data.message}`, 'left');
})

socket.on('left', names => {
    append(`${names} left the chat`, 'left');
})