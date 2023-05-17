module.exports = () => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Product Listing</title>
        <style>
        .added-product {
            font-size: 3rem;
            text-align: center;
            animation-name: bounce;
            animation-duration: 1s;
          }
          
          @keyframes bounce {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
	</style>
       
      </head>
      <body>
      <h1 class="added-product">Product added!</h1>     
       <script>
       setTimeout(function () {
         window.location.href = "/admin"; // Redirect to home page
       }, 2000); // 2 second delay
     </script>
              </body>
            </html>`;
};
