const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./routes/api");
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname));
});

module.exports = app;
