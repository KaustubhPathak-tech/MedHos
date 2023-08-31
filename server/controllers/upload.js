import asyncWrapper from "../middlewares/asyncWrapper.js";
import items from "../models/item.js";

export const addItem = async (req, res) => {
    try {
      const file = req.file.path;
    const item = await items.create({ file });
    res.status(200).json("File uploaded Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
    
  };