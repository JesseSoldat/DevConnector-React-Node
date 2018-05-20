const gravatar = require("gravatar");

const User = require("../models/User");

module.exports = app => {
  app.post("/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    let errors = {};

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
};
