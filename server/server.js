const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Change from 5000 to 4000


// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Define an API route to interact with the hosted API
app.post('/analyze_tweets', async (req, res) => {
  const { username, expectedOutput } = req.body;

  if (!username || !expectedOutput) {
    return res.status(400).json({ error: 'Username and expected output are required' });
  }

  try {
    // Make a request to your hosted API with the user input
    const apiResponse = await axios.post('http://127.0.0.1:5000/analyze_tweets', {
      username,
      expectedOutput
    });

    // Forward the API response to the frontend
    return res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error('Error in fetching data from hosted API:', error);
    return res.status(500).json({ error: 'Error in fetching data from hosted API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
