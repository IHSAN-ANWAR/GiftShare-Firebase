const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../models/db');
const { ObjectId } = require('mongodb');

// GET /api/gifts - Get all gifts
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const giftsCollection = db.collection('gifts');
    const gifts = await giftsCollection.find({}).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Failed to fetch gifts' });
  }
});

// GET /api/gifts/:id - Get gift by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const giftsCollection = db.collection('gifts');
    const giftId = req.params.id;
    
    if (!ObjectId.isValid(giftId)) {
      return res.status(400).json({ error: 'Invalid gift ID' });
    }
    
    const gift = await giftsCollection.findOne({ _id: new ObjectId(giftId) });
    
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }
    
    res.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
});

// POST /api/gifts - Create a new gift
router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const giftsCollection = db.collection('gifts');
    const newGift = req.body;
    
    const result = await giftsCollection.insertOne(newGift);
    res.status(201).json({ ...newGift, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating gift:', error);
    res.status(500).json({ error: 'Failed to create gift' });
  }
});

module.exports = router;
