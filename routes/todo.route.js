const express = require('express');
const router = express.Router();
const todo_controller = require('../controllers/todo.controller');
const api_interceptor = require('../interceptors/api.interceptor');
const token_interceptor = require('../interceptors/token.interceptor');

router.use(api_interceptor);
router.use(token_interceptor);

router.get('/all', todo_controller.getAll);
router.post('/create', todo_controller.create);
router.put('/:id/done', todo_controller.makeDone);
router.delete('/:id/del', todo_controller.delTodo);

module.exports = router;