const { body, validationResult, matchedData } = require("express-validator");

const msgValidationRules = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 2, max: 100 }).withMessage("Title must be between 2 and 100 characters"),

  body("text")
    .trim()
    .notEmpty().withMessage("Message text is required")
    .isLength({ min: 2, max: 500 }).withMessage("Message text must be between 2 and 500 characters"),
];


const validateMsg = (req, res, next) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("signUpForm", {
      errors: errors.array()
    });
  }

  req.validatedData = matchedData(req); 
  next();
};

module.exports = {
    validateMsg,
    msgValidationRules
};