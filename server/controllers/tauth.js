'use strict';

import passport from 'passport';
import jwt from "jsonwebtoken";
import TwitterTokenStrategy from 'passport-twitter-token';
import TUser from "../models/tauth.js";
import dotenv from "dotenv"

dotenv.config();
var createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    }, 'my-secret',
    {
      expiresIn: 60 * 120
    });
  };
  
  


export default function () {
  passport.use(new TwitterTokenStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      includeEmail: true
    },
    function (token, tokenSecret, profile, done) {
      TUser.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }));
};
