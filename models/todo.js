const mongoose = require('mongoose');

//create a schema
const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    due_date: {
        type: String
    },
    category: {
        type: String
    },
    color: {
        type: String
    }
});

//create the model according to the schema
const todo = mongoose.model('ToDoList', todoSchema);

//export the model
module.exports = todo;