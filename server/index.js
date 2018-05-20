const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("*", (req, res) => res.send("JLab connection is established...."));

const port = process.env.PORT || 5000;
app.listen(port);
