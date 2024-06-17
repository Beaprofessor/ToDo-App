console.log("Welcome to my todo app");

let todos = [];

let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTodosButton = document.getElementById("get-todos");

getPendingTodosButton.addEventListener("click", () => {
  todos = todos.filter((todo) => todo.status != "Finished");
  reRenderTodos();
});

todoInputBar.addEventListener("keyup", function toggleSaveButton() {
  let todoText = todoInputBar.value;
  if (todoText.length == 0) {
    if (saveButton.classList.contains("disabled")) return;
    saveButton.classList.add("disabled");
  } else if (saveButton.classList.contains("disabled")) {
    saveButton.classList.remove("disabled");
  }
});

saveButton.addEventListener("click", function getTextAndAddTodo() {
  let todoText = todoInputBar.value;
  if (todoText.length == 0) return;
  let todo = {
    text: todoText,
    status: "In Progress",
    finishedButtonText: "Finished",
  };
  todos.push(todo);
  addTodo(todo, todos.length);
  todoInputBar.value = "";
});

function reRenderTodos() {
  todoDataList.innerHTML = "";
  todos.forEach((element, index) => {
    addTodo(element, index + 1);
  });
}

function removeTodo(event) {
  // console.log("clicked" , event.target.parentElement.parentElement.parentElement)
  // event.target.parentElement.parentElement.parentElement.remove()
  let deleteButtonPressed = event.target;
  let indexToBeRemoved = Number(deleteButtonPressed.getAttribute("todo-index"));
  todos.splice(indexToBeRemoved, 1);
  reRenderTodos();
}

function finishTodo(event) {
  let finishedButtonPressed = event.target;
  let indexToBeFinished = Number(
    finishedButtonPressed.getAttribute("todo-index")
  );

  // toggling functionality

  if (todos[indexToBeFinished].status == "Finished") {
    todos[indexToBeFinished].status = "In Progress";
    todos[indexToBeFinished].finishedButtonText = "Finished";
  } else {
    todos[indexToBeFinished].status = "Finished";
    todos[indexToBeFinished].finishedButtonText = "Undo";
  }

  todos.sort((a, b) => {
    if (a.status == "Finished") {
      return 1;
    }
    return -1;
  });

  reRenderTodos();
}

function editTodo(event) {
  let editButtonPressed = event.target;
  let indexToEdit = Number(editButtonPressed.getAttribute("todo-index"));
  let detailDiv = document.querySelector(`div[todo-index = "${indexToEdit}"]`);
  let input = document.querySelector(`input[todo-index = "${indexToEdit}"]`);
  detailDiv.style.display = "none";
  input.type = "text";
  input.value = detailDiv.textContent;
}

function saveEditedTodo(event) {
  let input = event.target;
  let indexToEdit = Number(input.getAttribute("todo-index"));
  let detailDiv = document.querySelector(`div[todo-index = "${indexToEdit}"]`);

  if (event.keyCode == 13) {
    detailDiv.textContent = input.value;
    detailDiv.style.display = "block";
    input.value = "";
    input.type = "hidden";
  }
}

function addTodo(todo, todoCount) {
  console.log("called add todo");

  let rowDiv = document.createElement("div");
  let todoItem = document.createElement("div");
  let todoNo = document.createElement("div");
  let todoDetail = document.createElement("div");
  let todoStatus = document.createElement("div");
  let todoAction = document.createElement("div");
  let finishedButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let editButton = document.createElement("div");
  let hiddenInput = document.createElement("input");
  let hr = document.createElement("hr");

  // adding Classes
  rowDiv.classList.add("row");
  todoItem.classList.add(
    "todo-item",
    "d-flex",
    "flex-row",
    "justify-content-between",
    "align-items-center"
  );
  todoNo.classList.add("todo-no");
  todoDetail.classList.add("todo-detail");
  todoStatus.classList.add("todo-status");
  todoAction.classList.add(
    "todo-actions",
    "d-flex",
    "justify-content-start",
    "gap-2"
  );
  finishedButton.classList.add("btn", "btn-success", "finished-todo");
  deleteButton.classList.add("btn", "btn-danger", "delete-todo");
  editButton.classList.add("btn", "btn-warning", "edit-todo");
  hiddenInput.classList.add("form-control", "todo-detail");

  // adding attributes
  finishedButton.setAttribute("todo-index", todoCount - 1);
  deleteButton.setAttribute("todo-index", todoCount - 1);
  todoDetail.setAttribute("todo-index", todoCount - 1);
  editButton.setAttribute("todo-index", todoCount - 1);
  hiddenInput.setAttribute("todo-index", todoCount - 1);
  hiddenInput.type = "hidden";

  // adding click listeners
  finishedButton.onclick = finishTodo;
  deleteButton.onclick = removeTodo;
  editButton.onclick = editTodo;
  hiddenInput.addEventListener("keypress", saveEditedTodo);

  todoNo.textContent = `${todoCount}`;
  todoDetail.textContent = todo.text; // sets the todo text sent from the input format
  todoStatus.textContent = todo.status;
  finishedButton.textContent = todo.finishedButtonText;
  deleteButton.textContent = "Delete";
  editButton.textContent = "Edit";

  // creating the div on DOM

  todoAction.appendChild(finishedButton);
  todoAction.appendChild(deleteButton);
  todoAction.appendChild(editButton);

  todoItem.appendChild(todoNo);
  todoItem.appendChild(todoDetail);
  todoItem.appendChild(hiddenInput);
  todoItem.appendChild(todoStatus);
  todoItem.appendChild(todoAction);

  rowDiv.appendChild(todoItem);
  rowDiv.appendChild(hr);

  todoDataList.appendChild(rowDiv);
}

// For reference
// let getTodoButton = document.getElementById('get-todo');
// // registration of event Listener and u can do multiple registrations
// getTodoButton.addEventListener('click',()=>{
//     console.log("Clicked")
// })

// // getTodoButton.addEventListener('click',handler())   // Ye tarika ganda hai call karne ka kyuki function mei kuch bhi doge toh wo sabko hi run kardega

// // getTodoButton.addEventListener('mouseover',handler)  // isliye aese function name dedo bas
// // function handler (){
// //     console.log("Clicked again!!!!!")
// // }

// // getTodoButton.addEventListener('mouseout',handler1)
// // function handler1(){
// //     console.log("Haa aagya bahar")
// // }

// // getTodoButton.onclick = ()=>{
// //     console.log("HalloBall")
// // }

// function clickBtn(){
//     console.log("click")
// }
