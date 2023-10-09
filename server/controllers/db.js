// mongodb.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// MongoDB connection URL
const url = process.env.CONNECTION_URL; // Replace with your MongoDB server URL

// Database Name
const dbName = 'MedHos';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology : true });

// Function to connect to MongoDB
export async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Function to close the MongoDB connection
export function closeMongoConnection() {
  client.close();
}
