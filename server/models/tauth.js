'use strict';

import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config();

const { Schema } = mongoose;

const db = mongoose.connect(process.env.CONNECTION_URL);

const TUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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

TUserSchema.statics.upsertTwitterUser = async function (token, tokenSecret, profile, cb) {
    try {
      const user = await this.findOne({
        'twitterProvider.id': profile.id
      }).exec();
  
      if (!user) {
        const newUser = new this({
          email: profile.emails[0].value,
          twitterProvider: {
            id: profile.id,
            token: token,
            tokenSecret: tokenSecret
          }
        });
  
        const savedUser = await newUser.save();
        return cb(null, savedUser);
      } else {
        return cb(null, user);
      }
    } catch (error) {
      console.error(error);
      return cb(error, null);
    }
  };
  



export default mongoose.model('TUser', TUserSchema);
