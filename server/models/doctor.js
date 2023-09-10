import mongoose from "mongoose";
const doctorSchema = mongoose.Schema({
  name: { type: String,  },
  email: { type: String, },
  contact:{type:String,},
  specialization:{type:String,},
  doc_fee:{type:String,},
  doc_experience:{type:String,},
  password: { type: String, },
  avatar: {
    type: String,
  },
  userType:{type:String,},
  file:{type:String,}
  
  
});

export default mongoose.model("Doctor", doctorSchema);