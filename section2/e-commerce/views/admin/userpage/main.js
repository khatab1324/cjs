const express = require("express");
const UsersRepo = require("../../../repositories/users");
const productsRepo = require("../../../repositories/repo-products");
const router = express.Router();

const renderedProducts = require("./renderProduct");

router.get("/", async (req, res) => {
  const email = "katabemad132456@gmail.com";
  const user = await UsersRepo.getOneBy({ email });
  console.log(user.id);
  const layout = require("./layoutForMainPage");
  const getProducts = await productsRepo.getAll();
  res.send(renderedProducts({ getProducts }));
});

module.exports = router;
