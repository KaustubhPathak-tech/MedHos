import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.CONNECTION_URL; 
const dbName = 'MedHos';
const client = new MongoClient(url);

export async function connectToMongo() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export function closeMongoConnection() {
  client.close();
}
