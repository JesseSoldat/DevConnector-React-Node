const Validator = require("validator");

module.exports = user => {
  const errors = {};

  Object.keys(user).forEach(key => {
    if (Validator.isEmpty(user[key])) {
      errors[key] = `${key.toUpperCase()} field is required`;
    }
  });

  if (!Validator.isEmail(user.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(user.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(user.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(user.password, user.password2)) {
    errors.password2 = "Passwords must match";
  }

  const isValid = !!Object.keys(errors).length;

  return {
    errors,
    isValid
  };
};
