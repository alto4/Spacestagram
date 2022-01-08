const express = require('express');
const connectDatabase = require('./config/db');

const app = express();

// Connect to MongoDB
connectDatabase();

app.get('/', (req, res) => res.send(`API running on port ${PORT}.`));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
