const { body, validationResult, matchedData } = require("express-validator");
require('dotenv').config();


const joinValidationRules = [
    body('joinPasscode')    
    .trim()
        .notEmpty().withMessage('Passcode is required')
        .equals(process.env.JOIN_PASSCODE).withMessage('Wrong passcode!'),
 
];


const validateJoin = (req, res, next) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
     req.validationErrors = errors.array();
        return next();
  }

  req.validatedData = matchedData(req); 
  next();
};

module.exports = {
    validateJoin,
    joinValidationRules
};