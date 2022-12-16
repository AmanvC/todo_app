const express = require('express');

//create a router
const router = express.Router();

//get the home controller
const homeController = require('../controllers/home_controller');

//set path for '/' to home controllers home method
router.get('/', homeController.home);

//navigate to create-todo
router.post('/create-todo', homeController.createTodo);

//delete selected todos
router.get('/delete-todos', homeController.deleteTodos);

//filter todos according to category
router.get('/filter', homeController.filterTodos)

//export the router
module.exports = router;