const layout = require("./layoutForMainPage");

module.exports = ({ getProducts, user }) => {
  const renderedProducts = getProducts
    .map((product) => {
      return `
        <div class="column is-one-quarter">
          <div class="card product-card">
            <figure>
            
              <img class="crop" src="data:image/png;base64, ${product.image}"/>
             
              </figure>
            <div class="card-content">
              <h3 class="subtitle">${product.productName}</h3>
              <h5>$${product.productPrice}</h5>
            </div>
            <footer class="card-footer">
              <form method="POST" action="/cart/products/" >
              <input hidden value="${product.id}" name="productId" />
                <button class="button has-icon is-inverted">
                
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>
          </div>
        </div>
      `;
    })
    .join("\n");

  return layout({
    content: `
      <header>
      
      
    <nav class="navbar navbar-bottom">
    
      <div class="container navbar-container">
        <div>
       
        
          <ul class="links">
          <a href="/">
          <img
          class="logo"
          src="https://img.freepik.com/premium-vector/phone-logo-icon-vector-isolated_717577-56.jpg"
          alt="smart-phone-store-logo"/></a>
    <li class="li1"><a class="links1" href="#">shop</a></li>
    <li class="li1"><a class="links1" href="#">mobile</a></li>
    <li class="li1"><a class="links1" href="#">smart Thing</a></li>
  </ul>
  
   
    <i class="fa-sharp fa-solid fa-cart-shopping"></i>
    
    
  </div>
  </div>
        
        <div class="navbar-item">
          <div class="navbar-buttons">
            <div class="navbar-item">
              <a href="/"> <i class="fas fa-search"></i></a>
            </div>
            <div class="navbar-item">
              <a href="/cart"><i class="fa fa-shopping-cart"></i> Cart</a>
            </div>
            <div class="sign">
      <a class="sign-in" href="sign-in">${user?.username ?? "Sign In"}</a>
      </div>
          </div>
        </div>
      </div>
    </nav>
    
  </header>
      <section class="banner">
        <div class="container">
          <div class="columns is-centered">
            <img src="/image/banner.jpg" />
          </div>
        </div>
      </section>
      
      <section>
        <div class="container">
          <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
              <div>
                <h2 class="title text-center">Featured Items</h2>
                <div class="columns products">
                  ${renderedProducts}  
                </div>
              </div>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </section>
     
    `,
  });
};
