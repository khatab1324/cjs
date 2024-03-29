const { check } = require("express-validator");
const UsersRepo = require("../../repositories/users");

module.exports = {
  requirUsername: [
    check("username")
      .exists()
      .withMessage("Username is required")
      .isLength({ min: 4 })
      .withMessage("The username should have at least 4 characters")
      .isString() //it doesn't work
      .withMessage("The username must be a string")
      .custom(async (username) => {
        //this from chat gpt that check the username is string
        if (!/^[a-zA-Z]+$/.test(username)) {
          throw new Error(
            "The username must contain only alphabetic characters"
          );
        }
        const existUsername = await UsersRepo.getOneBy({ username });
        console.log(existUsername);
        if (existUsername) {
          throw new Error("there user have the same name");
        }
        return true;
      }),
  ],
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be vaild email")
    .custom(async (email) => {
      const existingEmail = await UsersRepo.getOneBy({ email });
      if (existingEmail) {
        throw new Error("the email is already exist");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Must be between 8 to 20 characters"),

  requirePasswordConfirmatio: check("passwordConfirmation")
    .trim()
    .isLength({ min: 8, max: 20 }) //the withMessage linked with custom in express-validation
    .withMessage("password must match ^__-")
    .custom((passwordConfirmation, { req }) => {
      //I put req becuase I need password and check have just one but , this way made by express-valdi....

      if (passwordConfirmation !== req.body.password) {
        throw new Error("password must match ^__-");
      }
      return true;
    }),
  requireEmailExist: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await UsersRepo.getOneBy({ email });
      if (!user) {
        throw new Error("Email not found!");
      }
      return true;
    }),
  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await UsersRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid password");
      }

      const validPassword = await UsersRepo.comparePassword(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error("Invalid password");
      }
    }),
  requireProductName: check("productName")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("enter value"),
  requirProductPrice: check("productPrice")
    .trim()
    .toFloat() //because always the server convert the number to sting , the float make it number
    .isFloat({ min: 1 }) //this check are we have number
    .withMessage("must be number greater than 1 "),
};
