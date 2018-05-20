const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./config/keys").MONGO_URI;
mongoose.connect(db);

require("./routes/user")(app);

app.get("*", (req, res) => res.send("JLab connection is established...."));

const port = process.env.PORT || 5000;
app.listen(port);
