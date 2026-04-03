const { body, validationResult, matchedData } = require("express-validator");
 

const adminValidationRules = [
    body('adminPasscode')    
    .trim()
        .notEmpty().withMessage('Passcode is required')
        .equals(process.env.ADMIN_PASSCODE).withMessage('Wrong passcode!'),
 
];


const validateAdmin = (req, res, next) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
     req.validationErrors = errors.array();
        return next();
  }

  req.validatedData = matchedData(req); 
  next();
};

module.exports = {
     validateAdmin,
     adminValidationRules
};