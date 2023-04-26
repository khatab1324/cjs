const express = require("express");
const { check, validationResult } = require("express-validator");
const UsersRepo = require("../repositories/users.js");
const signupTemplate = require("../views/admin/auth/sign-up.js");
const signinTemplate = require("../views/admin/auth/sign-in.js");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmatio,
} = require("./validator.js");
const router = express.Router(); //it rether than app but it track the app
// ---------------------------------sign in-------------------------------

router.get("/sign-in", (req, res) => {
  res.send(signinTemplate()); //uplaod the file
});
router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersRepo.getOneBy({ email });
  if (!user) {
    return res.send("email not found pls try one or sign-up");
  }
  const vaildPassword = await UsersRepo.comparePassword(
    user.password, //this from database
    password //this from req
  );
  if (!vaildPassword) {
    return res.send("invild password");
  }
  console.log(req.session);
  req.session.userId = user.id;
  res.send(`
    <h1>welcome bake ^__^</h1>
    <div><botton ><i><a href="/">home page</a></i></button></div>
    <botton><i><a href="/signout">sign-out</a></i></button>`);
});

// ---------------------------------------sgin-up-------------------------------------
router.get("/sign-up", (req, res) => {
  res.send(signupTemplate({ req }));
});
router.post(
  "/sign-up",
  [requireEmail, requirePassword, requirePasswordConfirmatio],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res;
    }
    //get access to email,confirmPassword,password
    const { email, password, passwordConfirmation, username } = req.body;

    if (!password || !email || !passwordConfirmation || !username) {
      console.log("user not fill all info");
      return res.send("plz fill all the info ^__^");
    }

    // create a user in our user repo  to represent this person
    const user = await UsersRepo.create({ email, password, username });

    // Store the id of that user inside the user cookie
    req.session.userId = user.id; //Added by cookie session! //and userId can be any thing like idOfPrsonThatMakingReq and that id will go to browser and save this id in cookie
    res.sendFile(__dirname + "/" + "welcome.html");
  }
);
// ------------------------------------sgin out ------------------------
router.get("/signout ", (req, res) => {
  req.session = null;
  res.send(`<h1>now you are signout -_-</h1>
    <botton><a href="/">home page</a></button>`);
});
module.exports = router;