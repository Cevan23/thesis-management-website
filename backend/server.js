const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/Item');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log(err);
});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/items', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const newItem = new Item({ name });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
