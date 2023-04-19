const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const UsersRepo = require("../repositories/users");
const authRouter = require("../adimin-pages/auth");
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // here the laibary
app.use(
  cookieSession({
    keys: ["holle people"], //This keys property is used to encrypt all the information that is stored inside the cookie because it very bad if the user can play with it and make him self another one  but with key not be able to decipher it or let alone make any changes to the information stored inside there just
  })
);
app.use(authRouter); //this to use router that we add to auth.js file
app.use(express.static(__dirname)); //to use dirname
// app.use(express.static("public"));
// app.use(express.static("files"));

// ---------------------------- main page -----------------------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "main.html"); //uplaod the file
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "navbar.css"); //uplaod the file
});
app.get("/sign-in", (req, res) => {
  res.sendFile(__dirname + "/" + "sign-in.html"); //uplaod the file
});
app.get("/sign-up", (req, res) => {
  res.sendFile(__dirname + "/" + "sign-up.html");
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

app.listen(2000, () => {
  console.log("ah i listening");
});
