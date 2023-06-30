module.exports = ({ content }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop</title>
    <style>
  body{
    margin: 0;
}

#navbar{
    display:  inline-block;
    width: 100%;
    height: 60px;
    background-color: rgb(230, 227, 227);
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
}
.logo{
    border-radius:50%; 
    width: 70px;
    height: 70px;
    display:inline-block ;
    position: relative;
    left: 0px;
    
}
.links{
    position: relative;
    right: 20%;
    
}
.li1{
    display: inline-block ;
    margin-left:20px ;
    
}
.links1{
    
    font-size: 23px;
    text-decoration: none;
    color: rgb(0, 0, 0);
    display: flex ;
    justify-content: center;
    padding: 5px;
    position: relative;
    bottom: 20px;

}
.links1:hover{
    background-color: rgb(0, 0, 0);
   
    color: aliceblue;
    border-radius:20px ;
}

#helppingUser{
    width: 180px;
    display: flex;
    
    align-items: center;
    justify-content: space-between;
}
.sign-in{
    
    font-size: 25px;
    text-decoration: none;
    color: #2f6294;
    padding: 10px;
}
.sign:hover
{

    border-radius: 15px;
    background-color: #00a6ff;
    transition: background-color 0.7s ;
}   
.sign-in:hover{
    color: rgb(255, 255, 255);
    transition: color 1s;

}
</style>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
  </head>

  <body>
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
        <a class="sign-in" href="sign-in">sing in</a>
        </div>
            </div>
          </div>
        </div>
      </nav>
      
    </header>

    ${content}
    <nav class="navbar navbar-top">
        <div class="container navbar-container">
          <div>
            <ul class="social">
              <li>
                <a href=""><i class="fa fa-phone"></i>+1 555 987 6543</a>
              </li>
              <li>
                <a href=""><i class="fa fa-envelope"></i> shop@myshop.com</a>
              </li>
            </ul>
          </div>
          <div>
            <ul class="social">
              <li><a href=""><i class="fab fa-facebook"></i></a></li>
              <li><a href=""><i class="fab fa-twitter"></i></a></li>
              <li><a href=""><i class="fab fa-linkedin"></i></a></li>
              <li><a href=""><i class="fab fa-dribbble"></i></a></li>
              <li><a href=""><i class="fab fa-google-plus"></i></a></li>
            </ul>
          </div>
        </div>
      </nav>
  </body>
</html>
  `;
};
