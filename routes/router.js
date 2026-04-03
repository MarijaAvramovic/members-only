 const router = require('express').Router();
const controller = require('../controllers/controller');

router.get('/', controller.getMessages);
router.get('/signup', controller.signUpGet);


module.exports = router;