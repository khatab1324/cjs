const layout = require("../layout");
const getError = (errors, prop) => {
  // prop === 'email' || 'password'
  try {
    return errors.mapped()[prop].msg;

    //errors.mapped its object that have email password passwordConfirmation and there msg and if you want more info 394
  } catch (err) {
    //because if error not exist in like email that will give us error
    return "";
  }
};
module.exports = ({ errors }) => {
  return layout({
    content: `
      <div>
        <form method="POST">
          <input name="email" placeholder="email"/>
          <p class="help is-danger">${getError(errors, "email")}</p>
          <input name="password" placeholder="password" />
          <p class="help is-danger">${getError(errors, "password")}</p>
          <button>Sign In</button>
          <a href="/sign-up" class="transition">don't you have account</a>
        </form>
      </div>
    `,
  });
};
