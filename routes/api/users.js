const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// POST - register new user
router.post(
  '/',
  [
    check('username', 'Please enter a username.').not().isEmpty(),
    check('email', 'Please enter an email address.').isEmail(),
    check('password', 'Please enter a password that is at least 8 characters in length.').isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check email already exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists.' }] });
      }

      // Get gravatar
      const avatar = gravatar.url(email, {
        s: '250',
        r: 'pg',
        d: 'mm',
      });

      // Create new user object
      user = new User({
        username,
        email,
        password,
        avatar,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
