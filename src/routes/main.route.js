const express = require('express');
const router = express.Router();
const api_interceptor = require('../interceptors/api.interceptor');
const main_controller = require('../controllers/main.controller');

router.use(api_interceptor);

router.get('/', main_controller.status);
module.exports = router;