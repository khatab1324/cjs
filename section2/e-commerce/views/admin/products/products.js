const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
     <html>
     <head>
     <style>
     /* Form styles */
    .DeleteForm{
      width: 500px;
      height: 80px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
   </style>
     </head>
     
    <body>
      <tr >
        <td>${product.productName}</td>
        <td>${product.productPrice}</td>
        <td>
          <a href="/admin/products/${product.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
        <form class="DeleteForm" method="POST" action="/admin/products/${product.id}/delete">
          <button class="button is-danger">Delete</button>
          </form>
          </td>
      </tr>
      </body>
      </html>
    `;
    })
    .join("");

  return layout({
    content: `
      <div class="control centered">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New Product</a>
        </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>

            <th class="DeleteForm">Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
     
      
    `,
  });
};
