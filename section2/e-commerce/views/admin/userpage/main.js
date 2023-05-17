const express = require("express");
const productsRepo = require("../../../repositories/repo-products");
const router = express.Router();
const renderedProducts = require("./renderProduct");
router.get("/", async (req, res) => {
  const getProducts = await productsRepo.getAll();
  res.send(renderedProducts({ getProducts }));
});

module.exports = router;
