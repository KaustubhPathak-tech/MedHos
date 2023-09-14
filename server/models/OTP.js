import mongoose from "mongoose";
const UserOTPVerificationSchema=mongoose.Schema({
    userEmail:{type:String},
    otp:{type:String},
    createdAt:{type:Date},
    expireAt:{type:Date},
})


export default  mongoose.model("UserOTPVerification",UserOTPVerificationSchema);
