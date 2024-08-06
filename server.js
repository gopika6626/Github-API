const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint to fetch user repositories
app.get('/repos/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const response = await axios.get('https://api.github.com/users/${username}/repos');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching repos:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching repositories' });
    }
});

// Start the server
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
});