const { validationResult } = require("express-validator");
module.exports = {
  handleErrors(templateFunc, productDataCallBack) {
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // now I want send with errors the data to know and difine the productName and price
        let data = {};
        if (productDataCallBack) {
          data = await productDataCallBack(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }
      next();
      // to remember next its when the fuction finsh from inside here you can coutinue prossecing
    };
  }, //we return function because all middlewars must be function
};
