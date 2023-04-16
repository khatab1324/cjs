const express = require("express");
const app = express();
app.use(express.static(__dirname)); //to use dirname
// app.use(express.static("public"));
// app.use(express.static("files"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "main.html"); //uplaod the file
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "navbar.css"); //uplaod the file
});

// this to collect all the data before use any one of them
const bodyParser = (req, res, next) => {
  //next i will call it when I finsh process and collect info
  if (req.method === "POST") {
    req.on("data", (data) => {
      const parsed = data.toString("utf8").split("&");
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split("=");
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next(); //that mean get out . we done from processing
  }
};
// ---------------------------------sign in-------------------------------
app.get("/sign-in", (req, res) => {
  res.sendFile(__dirname + "/" + "sign-in.html"); //uplaod the file
});
app.post("/sign-in", bodyParser, (req, res) => {
  console.log(req.body);

  res.send(`
  <h1>welcome bake ^__^</h1>
  <botton><a href="/">home page</a></button>`);
});

// ---------------------------------------sgin-up-------------------------------------
app.get("/sign-up", (req, res) => {
  res.sendFile(__dirname + "/" + "sign-up.html");
});
app.post("/sign-up", bodyParser, (req, res) => {
  //get access to email,confirmPassword,password
  console.log(req.body);
  res.send(`<h1>welcome in our store ^__^</h1>
  <botton><a href="/">home page</a></button>`);
});

app.listen(2000, () => {
  console.log("ah i listening");
});
