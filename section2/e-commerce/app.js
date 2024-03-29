const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./route/userpage/auth/auth");
const productsRouter = require("./route/adimin-pages/products");
const adminPage = require("./route/adimin-pages/adminPage");
const mainpage = require("./views/admin/userpage/main");
const cartRouter = require("./route/userpage/cart");
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // here the laibary
// urlencoded this laibary alowe me to access for information that exist in the url
// you should know it doesn't work with img or (upload file)
app.use(
  cookieSession({
    keys: ["holle people"], //This keys property is used to encrypt all the information that is stored inside the cookie because it very bad if the user can play with it and make him self another one  but with key not be able to decipher it or let alone make any changes to the information stored inside there just
  })
);
app.use(authRouter); //this to use router that we add to auth.js file
app.use(productsRouter); //this to use router that we add to products.js file
app.use(adminPage);
app.use(mainpage);
app.use(cartRouter);
app.use(express.static(__dirname)); //to use dirname
app.use(express.static("public"));
// app.use(express.static("files"));

// ---------------------------- main page -----------------------

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
const port = 5000;
app.listen(port, () => {
  console.log(`ah i listening on port ${port}`);
});
