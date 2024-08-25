const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files for client-side JavaScript
app.use(express.static(path.join(__dirname, 'public')));

// Route modules
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');

app.use('/login', loginRouter);
app.use('/', chatRouter);

// 404 Route for handling unknown routes
app.use((req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});