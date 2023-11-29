import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
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
  twitterProvider: {
    type: {
      id: String,
      token: String
    },
  },
  avatar: {
    type: String,
  },
  userType: { type: String,default:"user" },
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
  cart: {
    type: Array,
    default: [],
  },
  orders:{
    type: Array,
    default: [],
  }
});

userSchema.statics.upsertTwitterUser = async function (token, tokenSecret, profile, cb) {
  try {
    const user = await this.findOne({
      'twitterProvider.id': profile.id
    }).exec();

    if (!user) {
      const newUser = new this({
        email: profile.emails[0].value,
        name:profile.displayName,
        password: profile.id,
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

const userModel = mongoose.model("User", userSchema);
export default userModel;
