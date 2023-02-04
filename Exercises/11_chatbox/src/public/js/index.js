const socket = io();
const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');
let user;

Swal.fire( {
    title: 'Sign In',
    input: 'text',
    text: 'Write your chat name',
    inputValidator: (value) => {
        if (!value) {
            return 'You need a name to continue'
        };
    },
    allowOutsideClick: false
}).then( result => {
    user =result.value;
    socket.emit('log in', user);
})

chatBox.addEventListener('keyup', e => {
    if(e.key === 'Enter') {
        if( chatBox.value.trim().length > 0) {
            socket.emit('send message', {user, message: chatBox.value});
            chatBox.value = '';
        }
    }
})

socket.on('messages', msgs => {
    let messages = '';
    msgs.forEach( msg => {
        messages = messages + `${msg.user} dice: ${msg.message}</br>`
    });
    messageLogs.innerHTML = messages;
})

socket.on('new user', usr => {
    Swal.fire( {
        text: `${usr} has connected`,
        toast: true,
        position: 'top-right'
    })
})

socket.on('chat logs', chats => {
    let messages = '';
    chats.forEach( chat => {
        messages = messages + `${chat.user} dice: ${chat.message}</br>`
    });
    messageLogs.innerHTML = messages;
})