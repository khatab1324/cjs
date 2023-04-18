const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const UsersRepo = require("../repositories/users");
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
// const bodyParser = (req, res, next) => {
//   //next i will call it when I finsh process and collect info
//   if (req.method === "POST") {
//     req.on("data", (data) => {
//       const parsed = data.toString("utf8").split("&");
//       const formData = {};
//       for (let pair of parsed) {
//         const [key, value] = pair.split("=");
//         formData[key] = value;
//       }
//       req.body = formData;
//       next();
//     });
//   } else {
//     next(); //that mean get out . we done from processing
//   }
// };

//

//we will use laibary that do the same thing above

// ---------------------------------sign in-------------------------------
app.get("/sign-in", (req, res) => {
  res.sendFile(__dirname + "/" + "sign-in.html"); //uplaod the file
});
// here the laibary
app.post("/sign-in", bodyParser.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);

  res.send(`
  <h1>welcome bake ^__^</h1>
  <botton><a href="/">home page</a></button>`);
});

// ---------------------------------------sgin-up-------------------------------------
app.get("/sign-up", (req, res) => {
  res.sendFile(__dirname + "/" + "sign-up.html");
});
app.post("/sign-up", bodyParser, async (req, res) => {
  //get access to email,confirmPassword,password
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await UsersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("email already exist");
  }
  if (!password || !email || !passwordConfirmation) {
    console.log("user not fill all info");
    return res.send("pls fill all the info ^__^");
  }
  // create a user in our user repo  to represent this person
  const user = await UsersRepo.create({ email, password });
  // Store the id of that user inside the user cookie

  res.send(`<h1>welcome in our store ^__^</h1>
  <botton><a href="/">home page</a></button>`);
});

app.listen(2000, () => {
  console.log("ah i listening");
});
