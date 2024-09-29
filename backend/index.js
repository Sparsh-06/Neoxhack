const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

let users = []; // Temporary in-memory storage of users


// Route to handle login via wallet address
app.post('/api/login', (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).send({ message: 'Wallet address is required.' });
    }

    // Check if user exists
    let user = users.find(u => u.walletAddress === walletAddress);
    if (!user) {
        // If the user doesn't exist, create a new user with this wallet address
        user = { walletAddress, createdAt: new Date() };
        users.push(user);
        return res.status(201).send({ message: 'New user created', user });
    }

    res.status(200).send({ message: 'User logged in', user });
});



app.listen(5000, () => {
    console.log('Server running on http://localhost:3000');
});
