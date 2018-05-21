const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const Validator = require("validator");
const jwt = require("jsonwebtoken");

const jwtKey = require("../config/keys").JWT_KEY;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: Validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const { id, name, avatar } = user;
  const payload = { id, name, avatar };
  const token = jwt.sign(payload, jwtKey).toString();
  return token;
};

UserSchema.statics.findByCredentials = async function(email, password, errors) {
  const User = this;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "User was not found";
      return Promise.reject(errors);
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
          errors.password = "The password did not match";
          return reject(errors);
        }
        resolve(user);
      });
    });
  } catch (err) {
    return errors;
  }
};

module.exports = User = mongoose.model("User", UserSchema);
