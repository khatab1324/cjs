const express = require("express");
const app = express();
app.use(express.static(__dirname));
// app.use(express.static("public"));
// app.use(express.static("files"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "main.html");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "navbar.css");
});
app.get("/sign-in", (req, res) => {
  res.sendFile(__dirname + "/" + "sign-in.html");
});
app.post("/sign-in", (req, res) => {
  res.send("Account created");
});

app.listen(2000, () => {
  console.log("ah i listening");
});
