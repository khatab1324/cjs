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
module.exports = (errors) => {
  return layout({
    content: `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Product Listing</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
          }
    
          header {
            background-color: #333;
            color: #fff;
            padding: 20px;
          }
    
          h1 {
            margin: 0;
          }
    
          main {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 20px;
          }
    
          .product {
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            margin-bottom: 20px;
            width: 300px;
          }
    
          .product img {
            display: block;
            max-width: 100%;
            height: auto;
            border-radius: 5px 5px 0 0;
          }
    
          .product h2 {
            font-size: 20px;
            margin: 10px 0;
            text-align: center;
          }
    
          .product p {
            font-size: 16px;
            margin: 10px 0;
            text-align: center;
          }
    
          .product button {
            background-color: #00a6ff;
            border: none;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            display: block;
            font-size: 16px;
            margin: 10px auto;
            padding: 10px;
            width: 80%;
          }
    
          .product button:hover {
            background-color: #3e8e41;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Product Listing</h1>
        </header>
    
        <main>
          <section class="product">
            <img src= alt="Product Image">
            <h2>Product Title</h2>
            <p>Product Description</p>
            <button>Add to Cart</button>
          </section>
    
          
            </section>
            </main>
            
              </body>
            </html>
    `,
  });
};
