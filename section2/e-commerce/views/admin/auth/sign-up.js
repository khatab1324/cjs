const layout = require("../layout");

// this func will check if there error
const getError = (errors, prop) => {
  // prop === 'email' || 'password' || 'passwordConfirmation'
  try {
    return errors.mapped()[prop].msg;

    //errors.mapped its object that have email password passwordConfirmation and there msg and if you want more info 394
  } catch (err) {
    //because if error not exist in like email that will give us error
    return "";
  }
};

module.exports = ({ req, errors }) => {
  //errors will be undefine but it enter the if statment that I pass the error it will define
  return layout({
    content: `
    <div>
      <form method="POST">
      <input type="text" name="username" placeholder="username" />
        <input name="email" placeholder="email" />
          <p class="help is-danger">${getError(errors, "email")}</p>
        <input name="password" placeholder="password" />
          <p class="help is-danger">${getError(errors, "password")}</p>
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <p class="help is-danger">${getError(
          errors,
          "passwordConfirmation"
        )}</p>
        <button>Sign Up</button>
      </form>
    </div>
  `,
  });
};
