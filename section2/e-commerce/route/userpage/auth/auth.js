const express = require("express");
const { handleErrors } = require("../../adimin-pages/middlewares");
const UsersRepo = require("../../../repositories/users.js");
const signupTemplate = require("../../../views/admin/auth/sign-up.js");
const signinTemplate = require("../../../views/admin/auth/sign-in.js");
const {
  requirUsername,
  requireEmail,
  requirePassword,
  requirePasswordConfirmatio,
  requireEmailExist,
  requireValidPasswordForUser,
} = require("../../adimin-pages/validator.js");
const router = express.Router(); //it rether than app but it track the app
// ---------------------------------sign in-------------------------------

router.get("/sign-in", (req, res) => {
  res.send(signinTemplate({})); //uplaod the file
});

router.post(
  "/sign-in",
  [requireEmailExist, requireValidPasswordForUser],
  handleErrors(signinTemplate), //here we use signinTemplate not signinTemplate() why? becuase the signinTemplate is refrence
  async (req, res) => {
    const { email } = req.body;
    const user = await UsersRepo.getOneBy({ email });
    if (email === "admin@admin.com") {
      req.session.userId = user.id;
      req.session.email = user.email;
      res.redirect("/admin");
    }
    if (user) {
      req.session.userId = user.id;
      req.session.email = user.email;
      res.sendFile(__dirname + "/" + "welcomeAgain.html");
    }
  }
);

// ---------------------------------------sgin-up-------------------------------------
router.get("/sign-up", (req, res) => {
  res.send(signupTemplate({ req }));
});
router.post(
  "/sign-up",
  [requirUsername, requireEmail, requirePassword, requirePasswordConfirmatio],
  handleErrors(signupTemplate),
  async (req, res) => {
    //get access to email,confirmPassword,password
    const { email, password, username } = req.body;
    console.log(req.body);
    // if (!password || !email || !passwordConfirmation || !username) {
    //   console.log("user not fill all info");
    //   return res.send("plz fill all the info ^__^");
    // }

    // create a user in our user repo  to represent this person
    const user = await UsersRepo.create({ email, password, username });

    // Store the id of that user inside the user cookie
    req.session.userId = user.id; //Added by cookie session! //and userId can be any thing like idOfPrsonThatMakingReq and that id will go to browser and save this id in cookie
    req.session.email = user.email;
    res.sendFile(__dirname + "/" + "welcome.html");
  }
);
// ------------------------------------sgin out ------------------------
router.get("/sign-out", (req, res) => {
  req.session = null; //we clear the coockies
  res.send(`<h1>now you are signout -_-</h1>
    <botton><a href="/">home page</a></button>`);
});
module.exports = router;
