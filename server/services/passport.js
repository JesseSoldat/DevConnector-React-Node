const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const keys = require("../config/keys");
const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader("x-auth");
opts.secretOrKey = keys.JWT_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id);

        if (!user) return done(null, false);

        return done(null, user);
      } catch (err) {
        console.log("passport service err", err);
        done(err, false);
      }
    })
  );
};
