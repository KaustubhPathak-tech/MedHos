'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectToDatabase = () => {
  return mongoose.connect('mongodb://localhost:27017/twitter-demo');
};

const TUserSchema = new Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  twitterProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

const TUserModel = mongoose.model('TUser', TUserSchema);

module.exports = {
  connectToDatabase,
  TUserModel
};
