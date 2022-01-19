const express = require('express');
const connectDatabase = require('./config/db');
const config = require('config');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json({ extended: false }));

app.get('/key', (req, res) => res.json({ key: config.get('nasaApiKey') }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Check for production environment to serve assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
