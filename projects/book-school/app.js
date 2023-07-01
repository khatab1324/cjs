const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(1000, () => {
  console.log("conction open on port 1");
});
