import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  phone: { type: String },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  avatar: {
    type: String,
  },
  userType: { type: String },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const userModel= mongoose.model("User", userSchema);
export default userModel;
