const express = require("express");
const router = express.Router();
const productsRepo = require("../repositories/repo-products");
const addProducts = require("../views/admin/products/newProducts");
const showProducts = require("../views/admin/products/products");
const { requireProductName, requirProductPrice } = require("./validator");
const { validationResult } = require("express-validator");

router.get("/admin/products", (req, res) => {
  res.send(showProducts({}));
});
router.get("/admin/products/new", (req, res) => {
  res.send(addProducts({}));
});
router.post(
  "/admin/products/new",
  [requireProductName, requirProductPrice],
  (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    res.send("productadd");
  }
);

module.exports = router;
