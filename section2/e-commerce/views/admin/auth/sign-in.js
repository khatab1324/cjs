const layout = require("../layout");

module.exports = () => {
  return layout({
    content: `
      <div>
        <form method="POST">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" />
          <button>Sign In</button>
          <a href="sign-up" class="transition">don't you have account</a>
        </form>
      </div>
    `,
  });
};
