const express = require('express');
const connectDatabase = require('./config/db');
const config = require('config');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors({ origin: 'http://127.0.0.1:5000' }));

app.get('/', (req, res) => res.send(`API running on port ${PORT}.`));
app.get('/key', (req, res) => res.json({ key: config.get('nasaApiKey') }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
