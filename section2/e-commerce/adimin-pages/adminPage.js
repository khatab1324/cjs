const express = require("express");
const router = express.Router();
router.get("/admin", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/sign-in");
  }
  res.send(` <!DOCTYPE html>
    <html>
      <head>
      <style>
      h1 {
        font-size: 36px;
        color: #333;
        text-align: center;
        margin-top: 50px;
      }
      
      /* Style for the buttons */
      button {
        background-color: #3498db;
        border: none;
        color: #fff;
        padding: 10px 20px;
        margin-top: 20px;
        border-radius: 5px;
        cursor: pointer;
      }
      
      button:hover {
        background-color: #2980b9;
      }
      
      /* Style for the links inside the buttons */
      button a {
        color: #fff;
        text-decoration: none;
      }
      
      button a:hover {
        text-decoration: underline;
      }
      
      /* Style for the container div */
      div {
        display: flex;
        justify-content: center;
        margin-top: 50px;
      }
    </style>
    
      </head>
      <body>
      </div>
      <button><i><a href="/sign-out">sign-out</a></i></button>
        </body>
       <h1>welcome bake admin ^__^</h1>
    <div>
      <button ><i><a href="/admin/products">prducts</a></i></button>
      <button ><i><a href="/admin/products/new">add prducts</a></i></button>
   </body>
    </html`);
});
module.exports = router;
