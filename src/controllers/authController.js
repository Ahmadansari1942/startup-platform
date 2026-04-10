const passport = require('passport');
const User = require('../models/User');
const logger = require('../utils/logger');

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('pages/login', {
    title: 'Login',
    layout: 'layout'
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      logger.error('Login error:', err);
      return next(err);
    }
    
    if (!user) {
      req.flash('error_msg', info.message || 'Invalid credentials');
      return res.redirect('/auth/login');
    }
    
    req.logIn(user, async (err) => {
      if (err) {
        logger.error('Session error:', err);
        return next(err);
      }
      
      await user.updateLastLogin();
      logger.info(`User logged in: ${user.email}`);
      
      req.flash('success_msg', `Welcome back, ${user.name}!`);
      return res.redirect(req.session.returnTo || '/dashboard');
    });
  })(req, res, next);
};

exports.getRegister = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('pages/register', {
    title: 'Register',
    layout: 'layout'
  });
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, company } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/auth/register');
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      company
    });
    
    logger.info(`New user registered: ${email}`);
    
    // Auto login after registration
    req.logIn(user, (err) => {
      if (err) {
        logger.error('Auto-login error:', err);
        req.flash('error_msg', 'Registration successful but login failed');
        return res.redirect('/auth/login');
      }
      
      req.flash('success_msg', 'Welcome! Your account has been created.');
      res.redirect('/dashboard');
    });
    
  } catch (error) {
    logger.error('Registration error:', error);
    req.flash('error_msg', 'Registration failed. Please try again.');
    res.redirect('/auth/register');
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      logger.error('Logout error:', err);
      return res.redirect('/dashboard');
    }
    req.flash('success_msg', 'You have been logged out successfully');
    res.redirect('/');
  });
};
