
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterButton = document.querySelector("#todoSearch");
let todos = [];



runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", allTodoRemove);
    filterButton.addEventListener("keyup", filterTodo);

}

function filterTodo(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");
    if (todoList.length > 0) {
        todoList.forEach((todo) => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {

                todo.setAttribute("style", "display : block");

            }
            else {

                todo.setAttribute("style", "display : none !important");

            }
        })
    }
    else {
        showAlert("warning", "Not Todo");
    }


}

function allTodoRemove() {

    const allLi = document.querySelectorAll(".list-group-item");

    if (allLi.length > 0) {
        allLi.forEach(function (todo) {
            todo.remove();
        })

        //?Storage Delete

        let todos = [];

        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "All Todo successfully deleted");

    } else {
        showAlert("warning", "There is no todo to delete.")
    }

}

function removeTodoToUI(e) {

    //?UI clear
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement.remove();
     //? Stroge clear
        removeTodoToStroge(todo.textContent);
        showAlert("success", "Successfully deleted");
    }




}

function removeTodoToStroge(removeTodo) {
    checkTodosFromStorage();
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    })
}


function pageLoded() {
    checkTodosFromStorage();
    todos.forEach((todo) => {
        addTodoUI(todo);

    });
}
function addTodo(e) {
    const inputText = addInput.value.trim();
    e.preventDefault();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Todo not added .");
    }
    else {
        //?Arayüze ekleme
        addTodoUI(inputText);
        //? Storage add
        addTodoToStorage(inputText);
        //? Alert with warning
        showAlert("success", "Todo added.");
    }

}

function addTodoUI(newTodo) {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between my-1 border";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.className = "delete-item";
    a.href = "#";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";

}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));


}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {

        todos = JSON.parse(localStorage.getItem("todos"));
    }

}

function showAlert(type, message) {
    const div = document.createElement("div");
    // div.className = "alert alert-" + type;
    div.className = ` alert alert-${type} `;
    div.textContent = message;
    firstCardBody.appendChild(div);


    setTimeout(() => {
        div.remove();

    }, 2500);
}