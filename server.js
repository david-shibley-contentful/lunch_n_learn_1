// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

// Create an instance of an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a Redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || undefined, // Use password if specified
  });

// Connect to Redis
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route for handling a POST request and storing data in Redis
app.post('/data', (req, res) => {
  const data = req.body;
  const key = `data:${new Date().getTime()}`; // Unique key for each data entry

  // Store data in Redis
  redisClient.set(key, JSON.stringify(data), (err, reply) => {
    if (err) {
      res.status(500).send('Error storing data in Redis');
    } else {
      res.send(`Data stored with key: ${key}`);
    }
  });
});

// Route with a dynamic parameter and fetching data from Redis
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  // Fetch user data from Redis
  redisClient.get(`user:${userId}`, (err, data) => {
    if (err) {
      res.status(500).send('Error fetching data from Redis');
    } else if (data) {
      res.send(`User data: ${data}`);
    } else {
      res.send(`User ID: ${userId} not found in Redis`);
    }
  });
});

// Start the server and listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
