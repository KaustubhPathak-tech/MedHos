// app.js

import { connectToMongo, closeMongoConnection } from "./db.js";

export const allCity = async (req, res) => {
  try {
    const db = await connectToMongo();

    // Access the collection where your JSON data is stored
    const collection = db.collection("city");

    // Perform queries or find documents in the collection
    const documents = await collection.find().toArray();

    // console.log("Retrieved documents: ", documents);

    // You can now work with the JSON data here
    res.send(documents);
    // Close the MongoDB connection when done
    closeMongoConnection();
  } catch (error) {
    console.error("Error:", error);
  }
};
