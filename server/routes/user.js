const gravatar = require("gravatar");

const User = require("../models/User");
const validateRegisterInput = require("../validations/register");

module.exports = app => {
  const errors = {};
  app.post("/auth/register", async (req, res) => {
    const { name, email, password, password2 } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    try {
      const user = await User.findOne({ email });
      if (user) {
        errors.email = "Email is already in use";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default
        });
        const newUser = new User({
          name,
          email,
          password,
          avatar
        });
        await newUser.save();
        res.json(newUser);
      }
    } catch (err) {
      errors.error = "Something went wrong. Please try again";
      return res.status(400).json(errors);
    }
  });

  app.post("/auth/login", async (req, res) => {
    const errors = {};
    const { email, password } = req.body;
    try {
      const user = await User.findByCredentials(email, password, errors);
      const token = await user.generateAuthToken();
      // console.log("errors#1", errors);
      res.send({ token });
    } catch (err) {
      console.log("errors#2", errors);
    }
  });
};
