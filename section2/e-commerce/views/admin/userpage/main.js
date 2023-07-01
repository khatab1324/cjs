const express = require("express");
const UsersRepo = require("../../../repositories/users");
const productsRepo = require("../../../repositories/repo-products");
const router = express.Router();

const renderedProducts = require("./renderProduct");

router.get("/", async (req, res) => {
  let user;
  const { email } = req.session;

  if (email) user = await UsersRepo.getOneBy({ email });

  const getProducts = await productsRepo.getAll();
  res.send(renderedProducts({ getProducts, user }));
});

module.exports = router;
