const express = require('express');

//create a router
const router = express.Router();

//get the home controller
const homeController = require('../controllers/home_controller');

//set path for '/' to home controllers home method
router.get('/', homeController.home);

//navigate to create-todo
router.post('/create-todo', homeController.createTodo);

//delete selected tasks
router.get('/delete-todos/', homeController.deleteTodos);

//export the router
module.exports = router;