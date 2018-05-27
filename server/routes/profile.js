const passport = require("passport");

const Profile = require("../models/Profile");

module.exports = app => {
  const errors = {};
  const fieldsArray = [
    "handle",
    "company",
    "website",
    "location",
    "bio",
    "status",
    "githubusername"
  ];

  const socialFieldsArray = [
    "youtube",
    "twitter",
    "facebook",
    "linkedin",
    "instagram"
  ];

  app.get("/api/profiles", async (req, res) => {
    const errors = {};
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "avatar"
      ]);
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.send(profiles);
    } catch (err) {
      res.status(404).json({ profile: "There are no profiles" });
    }
  });

  app.get(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
          "user",
          ["name", "avatar"]
        );

        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );

  app.get("/api/profile/handle/:handle", async (req, res) => {
    const errors = {};
    try {
      const profile = await Profile.findOne({
        handle: req.params.handle
      }).populate("user");
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).send(errors);
      }
      res.send(profile);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  app.post(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const isValid = true;
      const errors = [];

      if (!isValid) return res.status(400).json(errors);

      const bodyArray = Object.keys(req.body);

      const profileFields = { user: req.user.id };

      let socialFields = {};

      bodyArray.forEach(field => {
        if (field === "social") {
          return (socialFields = req.body[field]);
        }
        profileFields[field] = req.body[field];
      });

      profileFields.social = socialFields;
      const { skills } = req.body;
      if (skills.length > 0) {
        profileFields.skills = skills.split(",");
      }

      console.log("profile", profileFields);

      try {
        //CREATE NEW PROFILE
        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
          const handle = await Profile.findOne({
            handle: profileFields.handle
          });

          if (handle) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }
          const savedProfile = await new Profile(profileFields).save();
          console.log("create new");
          res.send(savedProfile);
        } else {
          //UPDATE PROFILE
          const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
          console.log("update");
          res.send(updatedProfile);
        }
        res.send();
      } catch (err) {
        console.log("err", err);
        res.status(400).send(err);
      }
    }
  );

  app.post(
    "/api/profile/experience",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.send(profile);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );

  app.post(
    "/api/profile/education",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;

      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.send(profile);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );

  app.delete(
    "/api/profile/experience/:exp_id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience
          .map(exp => exp.id)
          .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.send(profile);
      } catch (err) {
        res.status(404).send(err);
      }
    }
  );

  app.delete(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { id } = req.user;
      try {
        await Profile.findOneAndRemove({ user: id });
        await User.findOneAndRemove({ _id: id });
        res.send({ success: true });
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );
};
