const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// GET => api/auth => Get authorization
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error.');
  }
});

// POST => api/auth => Authenticate user and get auth token
router.post(
  '/',
  [
    check('username', 'Please enter a username or email.').not().isEmpty(),
    check('password', 'Please enter a password.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check email already exists
      let user = await User.findOne({ $or: [{ email: username }, { username }] });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials provided.' }] });
      }

      // Verify decrypted passwords match associated username or email
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials. Please try again.' }] });
      }

      // Return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600000 }, (err, token) => {
        if (err) {
          throw error;
        }
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error.');
    }
  }
);

module.exports = router;
