const { validationResult } = require("express-validator");
module.exports = {
  handleErrors(templateFunc, productDataCallBack) {
    //first thing we pass the template like sign-up
    return async (req, res, next) => {
      //we return a function becuase when we wrap the middleware in auth we need to return becuase of that we use function to return
      //express use next as callback becuase it written before promises
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        //if there error
        // now I want send with errors the data to know and difine the productName and price
        let data = {};
        if (productDataCallBack) {
          data = await productDataCallBack(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }
      //to know we was pass just templateFunc({error})
      next();
      // to remember next its when the fuction finsh from inside here you can coutinue prossecing
    };
  }, //we return function because all middlewars must be function
};
