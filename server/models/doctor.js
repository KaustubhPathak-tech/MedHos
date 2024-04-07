import mongoose from "mongoose";
const doctorSchema = mongoose.Schema(
  {
    //
    userId: {
      type: String,
    },
    //
    name: { type: String },
    email: { type: String },
    //
    contact: { type: String },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
    gender: { type: String },
    //
    local_city: { type: String },
    doc_reg_no: { type: String },
    doc_reg_council: { type: String },
    doc_reg_year: { type: String },
    doc_degree: { type: String },
    doc_institute: { type: String },
    //
    doc_experience: { type: String },
    est_name: { type: String },
    est_city: { type: String },
    file: { type: String },
    days: { type: Array },
    //
    docSes1_start: { type: String },
    docSes1_end: { type: String },
    docSes2_start: { type: String },
    docSes2_end: { type: String },
    //
    doc_fee: { type: String },
    password: { type: String },
    avatar: {
      type: String,
    },
    userType: { type: String },
    website: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    notification: {
      type: Array,
      default: [],
    },
    seennotification: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const doctorModel= mongoose.model("Doctor", doctorSchema);
export default doctorModel;
