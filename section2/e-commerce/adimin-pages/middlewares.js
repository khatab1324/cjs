const { validationResult } = require("express-validator");
module.exports = {
  handleErrors(templateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }
      next();
      // to remember next its when the fuction finsh from inside here you can coutinue prossecing
    };
  }, //we return function because all middlewars must be function
};
