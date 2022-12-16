let categories = ["Choose a category", "Personal", "Work", "School", "Cleaning", "Others"];

let filter_categories = ["Choose a category", "All", "Personal", "Work", "School", "Cleaning", "Others"];


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
            todo_list: todo_list,
            filter_categories: filter_categories
        })
    })
}

//create a todo and return to the home page
module.exports.createTodo = function(req, res){
    const obj = req.body;
    let color = '';
    let selectedCategory = obj.category[0];
    let key = colors.find(x => x.option == selectedCategory);
    color = key.color;
    obj.due_date = getFormattedDate(obj.due_date);
    Todo.create({
        todo: obj.todo,
        due_date: obj.due_date,
        category: obj.category[0],
        color: color
    }, function(err, newTodo){
        if(err){
            console.log("Todo cannot be added"+err);
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

//filter tasks according to the category
module.exports.filterTodos = function(req, res){
    let category = req.query.category;
    console.log(category);
    let script;
    if(category == 'All'){
        script = {}
    }else{
        script = {category:category};
    }
    Todo.find(script, function(err, filtered_todos){
        // console.log(filtered_todos)
        if(err){
            console.log(`Error occured in filtering the todos: ${err}`);
            return;
        }
        // return res.send(filtered_todos);

        // return res.redirect('/',{
        //     title: "TODO App",
        //     category: categories,
        //     filter_categories: filter_categories,
        //     todo_list: filtered_todos
        // });

        return res.render('home', {
            title: "TODO App",
            category: categories,
            filter_categories: filter_categories,
            todo_list: filtered_todos
        })
    })
}