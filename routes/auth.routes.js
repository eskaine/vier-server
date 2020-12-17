const router = require('express').Router();
const passport = require('../configs/passport.config');
const User = require('../models/user.models');

/**
 * @method POST
 * @route '/api/auth/register'
 */
router.post('/register', async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = new User({
      username,
      password,
    });

    await user.save();
    res.sendStatus(200);
    // res.redirect('/');
  } catch (error) {
    res.status(403).json({ message: 'User existed!' });
  }
});

/**
 * @method GET
 * @route '/api/auth/login'
 */
router.post('/login', (req, res) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/register');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.sendStatus(200);
    });
  })(req, res);
});

module.exports = router;
