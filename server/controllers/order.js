import Order from "../models/orders.js";
import users from "../models/auth1.js";
export const saveOrder = async (req, res) => {
  const { user, orderItems, shippingAddress, orderId } = req.body;
  // await users.findByIdAndUpdate(user,{$pull:{cart:{$ne:[]}}});
  // await users.findByIdAndUpdate(user,{$push:{cart:[]}});
  const newOrder = new Order({
    user,
    orderId,
    orderItems,
    shippingAddress,
  });
  const user1 = await users.findById(user);
  res.status(201).send({
    success: true,
    message: "medicine added to Cart successfully",
    data: user1.cart,
  });
  try {
    await newOrder.save();
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const verifyPayment = async (req, res) => {
  const { userId } = req.body;
  // console.log(typeof(userId));

  try {
    const user1 = await users.findOne({ _id: userId });
    // const order = await Order.find({ user: userId });
    // console.log(order[order.length - 1].status);
    // if (order[order.length - 1].status === "Order Confirmed") {
    //   res.status(201).send({
    //     success: true,
    //     message: "Order already confirmed",
    //     data: user1.cart,
    //   });
    // }
    res
      .status(201)
      .send({
        success: true,
        message: "Order already confirmed",
        data: user1.cart,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  const user = await users.findById(req.body.userId);
  if (user?.userType === "user") {
    try {
      const order = await Order.find({
        user: req.body.userId,
        confirmed: true,
      });
      res.status(200).json({ order: order });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else if (user?.isAdmin) {
    try {
      const order = await Order.find({ confirmed: true });
      res.status(200).json({ order: order });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
