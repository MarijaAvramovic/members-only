 const router = require('express').Router();
const controller = require('../controllers/controller');

router.get('/', controller.getMessages);


module.exports = router;