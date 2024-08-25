const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const chatLogPath = path.join(__dirname, '../chatlog.txt');

router.get('/', (req, res) => {
    fs.readFile(chatLogPath, 'utf8', (err, data) => {
        if (err) {
            data = 'No messages yet!';
        }

        res.send(`
            <h1>Welcome to the Group Chat</h1>
            <div id="chat-box" style="border:1px solid #ccc; padding:10px; width:300px; height:150px; overflow-y:scroll;">
                ${data.split('\n').map(line => `<p>${line}</p>`).join('')}
            </div>
            <form id="message-form">
                <input type="text" id="message" name="message">
                <button type="submit">Send Message</button>
            </form>
            <script>
                const username = localStorage.getItem('username');
                if (!username) {
                    alert('Please log in to join the chat');
                    window.location.href = "/login";
                }

                document.getElementById('message-form').addEventListener('submit', function(event) {
                    event.preventDefault();
                    const message = document.getElementById('message').value;
                    fetch('/send-message', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: 'username=' + encodeURIComponent(username) + '&message=' + encodeURIComponent(message)
                    }).then(response => response.text()).then(data => {
                        document.getElementById('chat-box').innerHTML = data;
                        document.getElementById('message').value = '';
                    });
                });
            </script>
        `);
    });
});

router.post('/send-message', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;

    const messageLine = `${username}: ${message}\n`;

    fs.appendFile(chatLogPath, messageLine, (err) => {
        if (err) {
            console.error('Failed to write message to file:', err);
        }

        fs.readFile(chatLogPath, 'utf8', (err, data) => {
            if (err) {
                res.send('Failed to read chat log');
            } else {
                res.send(data.split('\n').map(line => `<p>${line}</p>`).join(''));
            }
        });
    });
});

module.exports = router;