const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const clientID = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
let accessToken = '';

let students = []; // In-memory store for added students

app.use(express.json());
app.use(express.static('public')); // Serve the React app

// GitHub OAuth callback
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post(`https://github.com/login/oauth/access_token`, {
            client_id: clientID,
            client_secret: clientSecret,
            code
        }, { headers: { 'Accept': 'application/json' }});
        accessToken = response.data.access_token;
        res.redirect('/'); // Redirect to homepage after storing access token
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during GitHub authentication');
    }
});

// Search for users
app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
            headers: { Authorization: `token ${accessToken}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching for users');
    }
});

// Fetch student details
app.get('/student/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
            headers: { Authorization: `token ${accessToken}` }
        });
        const reposResponse = await axios.get(userResponse.data.repos_url, {
            headers: { Authorization: `token ${accessToken}` }
        });
        res.json({ user: userResponse.data, repos: reposResponse.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching student details');
    }
});

// Add student to mentor's list
app.post('/add-student', (req, res) => {
    const { username } = req.body;
    if (!students.includes(username)) {
        students.push(username);
    }
    res.json({ students });
});

// Get list of added students
app.get('/students', (req, res) => {
    res.json({ students });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
