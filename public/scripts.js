const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

const ws = new WebSocket(`ws://192.168.0.208:3002`);

ws.onmessage = function(event) {
    const messageString = event.data;
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = messageString;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
};

function sendMessage() {
    const message = messageInput.value.trim();

    if (message !== '') {
        ws.send(message);
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;

        messageInput.value = '';
    }
}

messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
