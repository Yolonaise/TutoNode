const express = require('express');
const router = express.Router();
const api_controller = require('../controllers/api.controller');
const api_interceptor = require('../interceptors/api.interceptor');

router.use(api_interceptor);

router.post('/create', api_controller.createApi);
router.get('/get/:pseudo', api_controller.getApi);
module.exports = router;