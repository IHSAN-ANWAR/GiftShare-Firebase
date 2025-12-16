const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'giftlink';

let client;
let db;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function closeConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
    client = null;
    db = null;
  }
}

module.exports = {
  connectToDatabase,
  closeConnection
};
