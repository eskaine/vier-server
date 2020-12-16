const router = require('express').Router();
const passport = require('passport');

/**
 * @method POST
 * @route '/api/auth/register'
 */
router.post(
  '/register',
  passport.authenticate('register', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  })
);

/**
 * @method GET
 * @route '/api/auth/login'
 */
router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  })
);

module.exports = router;
