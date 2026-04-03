const { body, validationResult, matchedData } = require("express-validator");

const userValidationRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("last_name")
    .trim()
    .notEmpty().withMessage("Last name is required")
    .isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),

  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
    .isAlphanumeric().withMessage("Username must contain only letters and numbers"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("confirm_password")
    .trim()
    .notEmpty().withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

const validateUser = (req, res, next) => {
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
    userValidationRules,
   validateUser,
};