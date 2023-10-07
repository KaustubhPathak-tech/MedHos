import medicines from "../models/medicines.js";
import users from "../models/auth1.js";

export const getMedicinesController = async (req, res) => {
  try {
    const medicine = await medicines.find({});
    res.status(200).send({
      success: true,
      message: "medicine data fetch success",
      data: medicine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching medicine Details",
    });
  }
};

export const addtoCartController = async (req, res) => {
  const { medicineId, userId } = req.body;
  try {
    const user = await users.findById(userId);
    await user.cart.push({ medicineId, qty: 1 });
    await user.save();
    res.status(201).send({
      success: true,
      message: "medicine added to Cart successfully",
      data: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "medicine addition issue",
      error,
    });
  }
};
export const removeController = async (req, res) => {
  const { medicineId, userId } = req.body;
  try {
    const user = await users.findById(userId);
    const index = user.cart.findIndex((item) => item.medicineId === medicineId);
    if (index > -1) {
      // only splice array when item is found
      user.cart.splice(index, 1); // 2nd parameter means remove one item only
    }
    await user.save();
    res.status(201).send({
      success: true,
      message: "medicine removed from Cart successfully",
      data: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "medicine removal issue",
      error,
    });
  }
};

export const increaseQty = async (req, res) => {
  const { medicineId, userId } = req.body;
  try {
    // Find the user document by its ID
    const user = await users.findById(userId);

    // Find the index of the medicine item in the user's cart
    const index = user.cart.findIndex((item) => item.medicineId === medicineId);
    var newQtyValue = user.cart[index].qty + 1;
    if (index > -1) {
      // Increment the quantity of the medicine item
      user.cart.splice(index, 1);
      await user.cart.push({ medicineId, qty: newQtyValue });
      await user.save();

      console.log(user.cart);

      res.status(201).send({
        success: true,
        message: "Medicine quantity increased successfully",
        data: user.cart,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Medicine not found in the user's cart",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message, // Send the error message for debugging
    });
  }
};
export const decreaseQty = async (req, res) => {
  const { medicineId, userId } = req.body;
  try {
    // Find the user document by its ID
    const user = await users.findById(userId);

    // Find the index of the medicine item in the user's cart
    const index = user.cart.findIndex((item) => item.medicineId === medicineId);
    if (user.cart[index].qty === 1) {
      return res.status(201).send({
        success: true,
        message: "Medicine quantity increased successfully",
        data: user.cart,
      });
    }

    var newQtyValue = user.cart[index].qty - 1;
    if (index > -1) {
      // Increment the quantity of the medicine item
      user.cart.splice(index, 1);
      await user.cart.push({ medicineId, qty: newQtyValue });
      await user.save();

      console.log(user.cart);

      res.status(201).send({
        success: true,
        message: "Medicine quantity increased successfully",
        data: user.cart,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Medicine not found in the user's cart",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message, // Send the error message for debugging
    });
  }
};

export const addMedicineController = async (req, res) => {
  try {
    const medicine = await medicines.create(req.body);
    res.status(201).send({
      success: true,
      message: "medicine added successfully",
      data: medicine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "medicine addition issue",
      error,
    });
  }
};
