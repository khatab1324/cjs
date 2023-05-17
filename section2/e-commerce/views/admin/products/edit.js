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
module.exports = ({ errors, product }) => {
  return layout({
    content: `
    <form method="POST">
    <label for="product-name">Product Name:</label>
    <input type="text"   name="productName" value= "${product.productName}">
    <p class="help is-danger">${getError(errors, "productName")}</p>


    <label for="product-price">Price:</label>
    <input type="number" name="productPrice" value= "${product.productPrice}">
    <p class="help is-danger">${getError(errors, "productPrice")}</p>
    <label for="product-image">Add Image:</label>
    <input name="product-image"type="file" >
    <input type="submit" value="Add Product">
  </form>
    `,
  });
};
