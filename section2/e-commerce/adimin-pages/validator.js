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
    .custom((passwordConfirmation, { req }) => {
      //I put req becuase I need password and check have just one but , this way made by express-valdi....

      const password = req.body.password;
      if (password !== passwordConfirmation) {
        throw new Error("password must match ^__-");
      }
    }),
};
