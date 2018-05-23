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

      // console.log("social", socialFields);
      profileFields.social = socialFields;
      // console.log("profile", profileFields);

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
      } catch (err) {
        console.log("err", err);

        res.status(400).send(err);
      }

      // fieldsArray.forEach(field => {
      //   profileFields[field] = req.body[field];
      // });

      // if (typeof req.body.skills !== "undefined") {
      //   profileFields.skills = req.body.skills.split(",");
      // }

      // const social = {};
      // socialFieldsArray.forEach(field => {
      //   if (!req.body[field]) return;
      //   social[field] = req.body[field];
      // });

      // const socialKeys = Object.keys(social);
      // if (socialKeys.length > 0) {
      //   profileFields["social"] = {};
      //   socialKeys.forEach(key => {
      //     profileFields.social[key] = social[key];
      //   });
      // }
    }
  );
};
