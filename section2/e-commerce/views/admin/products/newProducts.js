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
module.exports = ({ errors }) => {
  return layout({
    content: `
    <!DOCTYPE html>
<html>
  <head>
    <title>Add Product</title>
    <style>
    .outerContainer{
      background-color: #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center; /* Add this line to center-align the form content */
    }

    .container {
      width: 700px;
      height: 500px;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    h1 {
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-top: 10px;
    }

    input,
    select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: inline-block;
      width: 400px;
      box-sizing: border-box;
    }

    input[type="submit"] {
      background-color: #00a6ff;
      color: #fff;
      cursor: pointer;
      display: block;
      margin-top: 10px;
    }

    input[type="submit"]:hover {
      background-color: #2f6294;
    }

    /* Style for "Choose File" button */
    input[type="file"]::-webkit-file-upload-button {
      margin-top: 10px;
      font-size: 16px;
      padding: 10px;
      border: none;
      background-color: #00a6ff;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      width: 100px;
      border-radius:10px ;
      box-sizing: border-box;
    }

    input[type="file"]::-webkit-file-upload-button:hover {
      background-color: #2f6294;
    }
  </style>
  </head>
  <body>

  <div class="outerContainer">
  
    <div class="container">
      
      <form method="POST" enctype='multipart/form-data'>
        <label for="product-name">Product Name:</label>
        <input type="text" id="productName" name="productName">
               <p class="help is-danger"> ${getError(
                 errors,
                 "productName"
               )} </p>

        <label for="product-price">Price:</label>
        <input type="number" id="productPrice" name="productPrice" >
         <p class="help is-danger">${getError(errors, "productPrice")}</p>
        <label for="product-image">Add Image:</label>
        <input  id="product-image" name="product-image"type="file">
        <input type="submit" value="Add Product">
      </form>
      </div>
    </div>
  </body>
</html>
    `,
  });
};
