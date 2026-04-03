 const router = require('express').Router();
const passport = require('../config/passport');
const controller = require('../controllers/controller');
const {userValidationRules, validateUser} = require('../validators/userValidator');
const { msgValidationRules, validateMsg } = require('../validators/msgValidator');

router.get('/', controller.getMessages);
router.get('/dashboard', controller.getDashboard);
router.get('/signup', controller.signUpGet);
router.post('/signup', userValidationRules, validateUser, controller.createUser);

 

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.post('/add-message', msgValidationRules, validateMsg, controller.addMessage);



module.exports = router;