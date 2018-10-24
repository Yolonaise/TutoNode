const express = require('express');
const router = express.Router();
const api_interceptor = require('../interceptors/api.interceptor');
const user_controller = require('../controllers/user.controller');

router.use(api_interceptor);

router.post('/login', user_controller.login);
router.post('/signin',  user_controller.signin);

module.exports = router;