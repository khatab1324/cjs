const layout = require("../layout");
let totalPrice = 0;
module.exports = ({ items }) => {
  const renderedItems = items
    .map((item) => {
      totalPrice += item.product.productPrice * item.quantity;

      return `
        <div class="cart-item message">
          <h3 class="subtitle">${item.product.productName}</h3>
          <div class="cart-right">
            <div>
              $${item.product.productPrice}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
              $${item.product.productPrice * item.quantity}
            </div>
            <div class="remove">
              <form class="DeleteForm" method="POST" action="/cart/products/delete" >
              <input hidden value="${item.id}" name="itemId" />
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return layout({
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              <h1 class="title">$${totalPrice}</h1>
              <button class="button is-primary">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
      ${(totalPrice = 0)}
    `,
  });
};
