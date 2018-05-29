const passport = require("passport");

const Post = require("../models/Post");

module.exports = app => {
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.send(posts);
    } catch (err) {
      res.status(404).send({ nopostsfound: "No posts found" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      res.send(post);
    } catch (err) {
      res.status(404).send({ nopostfound: "No post found with that ID" });
    }
  });

  app.post(
    "/api/posts",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};

      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });

      try {
        newPost.save();
        res.send(newPost);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );
};
