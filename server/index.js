const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./config/keys").MONGO_URI;
mongoose.connect(db);

app.use(passport.initialize());
require("./services/passport")(passport);

require("./routes/user")(app);
require("./routes/profile")(app);

app.get("*", (req, res) => res.send("JLab connection is established...."));

const port = process.env.PORT || 5000;
app.listen(port);
