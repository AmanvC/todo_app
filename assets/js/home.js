let todos = document.querySelectorAll("input[type=checkbox]");

let totalTodods = todos.length;
let pendingTodosElement = document.querySelector('.count');
if(totalTodods === 0){
    pendingTodosElement.innerHTML = "All set, you don't have any tasks to do. Enjoy!";
}else{
    pendingTodosElement.innerHTML = totalTodods;
}

let checkedTodos = [];

let deleteButton = document.querySelector('.delete-task');

//push the selected todos into the array and toggle the checked class
todos.forEach((x) => {
    x.addEventListener('change', () => {
        if(x.checked){
            checkedTodos.push(x.name);
        }else{
            const index = checkedTodos.find(elem => elem === x.name);
            checkedTodos.splice(index,1);
        }
        let wrapper = document.getElementsByClassName(x.name)[0];
        wrapper.classList.toggle("checked");
    })
})

//set url to delete button and pass query params along with it
deleteButton.addEventListener('click', () => {
    let redirectedURL = 'delete-todos/?'
    if(checkedTodos.length === 0){
        deleteButton.href = "";
        return;
    }
    checkedTodos.forEach((x) => {
        redirectedURL += `id=${x}&`;
    })
    deleteButton.href = redirectedURL;
    totalTodods -= checkedTodos.length;
    pendingTodosElement.innerHTML = totalTodods
})


