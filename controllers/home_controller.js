let categories = ["Choose a category", "Personal", "Work", "School", "Cleaning", "Others"];

//get the schema model
const Todo = require('../models/todo');

let colors = [
    {
        option: "Personal",
        color: "#093145"
    },
    {
        option: "Work",
        color: "#107896"
    },
    {
        option: "School",
        color: "#1ABC9C"
    },
    {
        option: "Cleaning",
        color: "seagreen"
    },
    {
        option: "Others",
        color: "#D35400"
    },
    {
        option: "Choose",
        color: "transparent"
    }
]

//export home action and return to the home page
module.exports.home = function(req, res){
    Todo.find({}, function(err, todo_list){
        if(err){
            console.log("Error retrieving data from database");
            return;
        }
        return res.render('home', {
            title: "TODO App",
            category: categories,
            todo_list: todo_list
        })
    })
}

//create a todo and return to the home page
module.exports.createTodo = function(req, res){
    const obj = req.body;
    let color = '';
    let selectedCategory = obj.category;
    let key = colors.find(x => x.option == selectedCategory);
    color = key.color;
    obj.due_date = getFormattedDate(obj.due_date);
    Todo.create({
        todo: obj.todo,
        due_date: obj.due_date,
        category: obj.category,
        color: color
    }, function(err, newTodo){
        if(err){
            console.log("Todo cannot be added");
            return;
        }
        return res.redirect('back');
    })
}

//format the date in the required format
function getFormattedDate(due_date){
    if(!due_date){
        return;
    }
    let splitDate = due_date.split("-");
    console.log(splitDate);
    let months = ["0","JAN","FEB","MAR","APR","MAY","JUN","JULY","AUG","SEP","OCT","NOV","DEC"];
    return `${months[parseInt(splitDate[1])]} ${splitDate[2]}, ${splitDate[0]}`
}

//delete the selected todos and return to the home page
module.exports.deleteTodos = function(req, res){
    let selectedTodos = req.query.id;
    if(typeof(selectedTodos) === 'string'){
        Todo.deleteOne({"_id": selectedTodos}, function(err){
            if(err){
                console.log(`Error occured deleting todo from database: ${err}`);
                return;
            }
        })
    }else{
        for(let i of selectedTodos){
            Todo.deleteOne({"_id": i}, function(err){
                if(err){
                    console.log(`Error occured deleting todo from database: ${err}`);
                    return;
                }
            })
        }
    }
    setTimeout(() => {
        return res.redirect('back');
    }, 100);
}