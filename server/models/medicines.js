import mongoose from "mongoose";
const medicineSechema = mongoose.Schema(
  {
    //
    name: {
      type: String,
      required: [true, "name is require"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    manufacturer: {
      type: String,
      required: [true, "manufacturer is require"],
    },
    price: {
      type: String,
      required: [true, "price is require"],
    },
    expiry: {
      type: String,
      required: [true, "expiry is require"],
    },
    quantityinStock: {
      type: Number,
      required: [true, "quantityinStock is require"],
    },
    activeIngredients: {
        type: String,
    },
    dosageInstructions: {
        type: String,
    },
    storageConditions:{
        type: String,
    },
    imgurl:{
        type: String,
    },
  },
  { timestamps: true }
);
const medicineModel= mongoose.model("medicine", medicineSechema);

export default medicineModel;
