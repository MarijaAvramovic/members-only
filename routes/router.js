 const router = require('express').Router();
const controller = require('../controllers/controller');
const {userValidationRules, validateUser} = require('../validators/userValidator');

router.get('/', controller.getMessages);
router.get('/dashboard', controller.getDashboard);
router.get('/signup', controller.signUpGet);
router.post('/signup', userValidationRules, validateUser, controller.createUser);


module.exports = router;