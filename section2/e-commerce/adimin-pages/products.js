const express = require("express");
const multer = require("multer"); //this laibary handling with uploadb file img and even text because of that it cause errors if the order is wrong

const productsRepo = require("../repositories/repo-products");
const addProducts = require("../views/admin/products/newProducts");
const showProducts = require("../views/admin/products/products");
const productAdd = require("../views/admin/products/productAdd");
const productEdit = require("../views/admin/products/edit");
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
  if (!req.session.userId) {
    return res.redirect("/sign-in");
  }
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
router.get("/admin/products/:id/edit", async (req, res) => {
  //:id it mean any thing will access
  if (!req.session.userId) {
    return res.redirect("/sign-in");
  }
  const product = await productsRepo.getOne(req.params.id);
  if (!product) {
    return res.send("from where you get this id -_-");
  }
  res.send(productEdit({ product }));
});
router.post(
  "/admin/products/:id/edit",
  [requireProductName, requirProductPrice],
  upload.single("image"),
  handleErrors(productEdit, async (req) => {
    const product = await productsRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    //  if the req was have img enter the if statment
    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    }

    try {
      await productsRepo.update(req.params.id, changes);
    } catch {
      return res.send("sorry your item is form space :)");
    }
    res.redirect("/admin/products");
  }
);
router.post("/admin/products/:id/delete", async (req, res) => {
  await productsRepo.delete(req.params.id);
  res.redirect("/admin/products");
});

module.exports = router;
