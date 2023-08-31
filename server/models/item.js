import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  
  file: {
    type: String,
    required: [true, "Please provide a file"],
  },
});

export default mongoose.model("Item", itemSchema);
