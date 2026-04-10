const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const logger = require('../utils/logger');

// Home page
router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'Home',
    layout: 'layout'
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('pages/about', {
    title: 'About Us',
    layout: 'layout',
    team: [
      {
        name: 'John Doe',
        role: 'CEO & Founder',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        bio: 'Former Google PM with 10+ years in tech'
      },
      {
        name: 'Jane Smith',
        role: 'CTO',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        bio: 'Ex-Microsoft, built 3 successful startups'
      },
      {
        name: 'Mike Johnson',
        role: 'Head of Design',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        bio: 'Award-winning designer from Apple'
      }
    ]
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('pages/contact', {
    title: 'Contact Us',
    layout: 'layout'
  });
});

// Contact form submission
router.post('/contact', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array()[0].msg);
      return res.redirect('/contact');
    }
    
    const { name, email, subject, message } = req.body;
    
    // Save to database
    await Contact.create({
      name,
      email,
      subject,
      message,
      user: req.user ? req.user._id : null
    });
    
    logger.info(`Contact form submitted by: ${email}`);
    
    req.flash('success_msg', 'Thank you for your message! We will get back to you soon.');
    res.redirect('/contact');
    
  } catch (error) {
    logger.error('Contact form error:', error);
    req.flash('error_msg', 'Failed to send message. Please try again.');
    res.redirect('/contact');
  }
});

module.exports = router;
