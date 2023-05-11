const { check } = require("express-validator");
const UsersRepo = require("../repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be vaild email")
    .custom(async (email) => {
      const existingUser = await UsersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error("the email is already exist");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Must be between 8 to 20 characters"),

  requirePasswordConfirmatio: check("passwordConfirmation")
    .trim()
    .isLength({ min: 8, max: 20 })
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
  requireProductName: check("product-name").trim().isCurrency(),
  requirProductPrice: check("product-price")
    .trim()
    .toFloat() //because always the server convert the number to sting , the float make it number
    .isFloat({ min: 1 }) //this check are we have number
    .withMessage("must be number greater than 1 "),
};
