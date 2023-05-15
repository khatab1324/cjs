const layout = require("../layout");

module.exports = ({ product }) => {
  return layout({
    content: `
    <form method="POST">
    <label for="product-name">Product Name:</label>
    <input type="text"   name="productName" value= "${product.productName}">
       

    <label for="product-price">Price:</label>
    <input type="number" name="productPrice" value= "${product.productPrice}">
   
    <label for="product-image">Add Image:</label>
    <input name="product-image"type="file" >
    <input type="submit" value="Add Product">
  </form>
    `,
  });
};
