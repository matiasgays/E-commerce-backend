const socket = io();

const input = document.querySelector('input');
const div = document.getElementById('div');
const messages = [];

input.addEventListener('input', (e) => {
    socket.emit('char', e.target.value)
});

socket.on('broadcast message', res => {
    div.innerHTML = "";
    res.forEach(element => {
        const para = document.createElement('p');
        para.textContent = (`Client: ${element.id} - Message: ${element.message}`);
        div.appendChild(para);
    });
    
    console.log(res);
});