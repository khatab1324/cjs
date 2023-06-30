const express = require("express");

const cartRepo = require("../../repositories/cart");
const productsRepo = require("../../repositories/repo-products");

const cartShowTemplate = require("../../views/admin/userpage/show");
const router = express.Router();

// receive a post req
router.post("/cart/products", async (req, res) => {
  let cart;
  // figure out the cart !
  if (!req.session.cartId) {
    // we don't have a cart , we need to create one,
    // ...and store the cart id on the req.session.cardId
    // property
    cart = await cartRepo.create({ items: [] });
    // when you call cartRepo inside it , it creat random id ok
    req.session.cartId = cart.id;
    console.log("butt me");
  } else {
    // we have cart! lets get it form reporsitry
    cart = await cartRepo.getOne(req.session.cartId);
    console.log("noh not again");
    const existingItem = cart.items.find(
      (item) => item.id === req.body.productId
    );

    // Either increment quantity for existing product
    // OR add new product to item cart
    if (existingItem) {
      // increment quantity save cart
      existingItem.quantity++;
    } else {
      // add new id to item array
      cart.items.push({ id: req.body.productId, quantity: 1 });
    } //you make the change for cart.item
    await cartRepo.update(cart.id, {
      items: cart.items,
    });
  }
  console.log(cart);

  res.redirect("/");
});
// receive  a GET request to show all item in cart
router.get("/cart", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    res.send(`<h1>there is no item added </h1>
    <a href="/">home</a>
    `);
  }
  cart = await cartRepo.getOne(req.session.cartId);
  for (let item of cart.items) {
    // item === {id: ,quantity}
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }
  res.send(cartShowTemplate({ items: cart.items }));
});
// Recieve a post request to delete an item from a cart
router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartRepo.update(req.session.cartId, { items });

  res.redirect("/cart");
});

module.exports = router;
