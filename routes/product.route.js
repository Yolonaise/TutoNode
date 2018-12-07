const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');
const api_interceptor = require('../interceptors/api.interceptor');
const token_interceptor = require('../interceptors/token.interceptor');

router.use(api_interceptor);

router.get('/all', product_controller.getAll);
router.post('/create', product_controller.create);

module.exports = router;