const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../models/db');

// GET /api/gifts/search - Search gifts with filters
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const giftsCollection = db.collection('gifts');
    
    const { category, name, condition, age_years } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Filter on category
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    // Filter on name
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    
    // Filter on condition
    if (condition) {
      filter.condition = { $regex: condition, $options: 'i' };
    }
    
    // Filter on age_years
    if (age_years) {
      filter.age_years = parseInt(age_years);
    }
    
    const gifts = await giftsCollection.find(filter).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error searching gifts:', error);
    res.status(500).json({ error: 'Failed to search gifts' });
  }
});

module.exports = router;
