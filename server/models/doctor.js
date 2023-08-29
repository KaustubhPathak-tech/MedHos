import mongoose from "mongoose";
const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact:{type:String,required:true},
  specialization:{type:String,required:true},
  doc_fee:{type:String,required:true},
  doc_experience:{type:String,required:true},
  password: { type: String, required: true },
  avatar: {
    type: String,
  },
  userType:{type:String,},
  
  
  
});

export default mongoose.model("Doctor", doctorSchema);