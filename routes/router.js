 const router = require('express').Router();
const passport = require('../config/passport');
const controller = require('../controllers/controller');
const {userValidationRules, validateUser} = require('../validators/userValidator');

router.get('/', controller.getMessages);
router.get('/dashboard', controller.getDashboard);
router.get('/signup', controller.signUpGet);
router.post('/signup', userValidationRules, validateUser, controller.createUser);

 

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});


module.exports = router;