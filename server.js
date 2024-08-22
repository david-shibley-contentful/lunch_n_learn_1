// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route for handling a POST request
app.post('/data', (req, res) => {
  const data = req.body;
  res.send(`You sent: ${JSON.stringify(data)}`);
});

// Route with a dynamic parameter
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Start the server and listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
