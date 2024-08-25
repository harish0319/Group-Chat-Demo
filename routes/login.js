const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <h1>Group Chat Login</h1>
        <form id="login-form" action="/login" method="POST">
            <input type="text" id="username" name="username" placeholder="Enter your username">
            <button type="submit">Login</button>
        </form>
        <script>
            document.getElementById('login-form').addEventListener('submit', function(event) {
                event.preventDefault();
                const username = document.getElementById('username').value;
                localStorage.setItem('username', username);
                window.location.href = "/";
            });
        </script>
    `);
});

router.post('/', (req, res) => {
    res.redirect('/');
});

module.exports = router;