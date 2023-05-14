const express = require("express");
const multer = require("multer"); //this laibary handling with uploadb file img and even text because of that it cause errors if the order is wrong

const productsRepo = require("../repositories/repo-products");
const addProducts = require("../views/admin/products/newProducts");
const showProducts = require("../views/admin/products/products");
const productAdd = require("../views/admin/products/productAdd");
const { requireProductName, requirProductPrice } = require("./validator");
const { handleErrors } = require("./middlewares");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/sign-in");
  }
  const products = await productsRepo.getAll();
  res.send(showProducts({ products }));
});
router.get("/admin/products/new", (req, res) => {
  res.send(addProducts({}));
});
router.post(
  "/admin/products/new",
  upload.single("product-image"), //now i upload the img and the text before run them
  [requireProductName, requirProductPrice], //now the img and text define that mean i have access to productname and productPrice
  handleErrors(addProducts),
  async (req, res) => {
    let image = req.file.buffer.toString("base64");
    const { productName, productPrice } = req.body;
    await productsRepo.create({ productName, productPrice, image });
    res.send(productAdd({}));
  }
);

module.exports = router;
