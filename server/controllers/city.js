// app.js

import { connectToMongo, closeMongoConnection } from "./db.js";

export const allCity = async (req, res) => {
  try {
    const db = await connectToMongo();

    const collection = db.collection("city");

    const documents = await collection.find().toArray();
    return res.status(200).json({documents});
    // closeMongoConnection();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("Internal server error");
  }
};
