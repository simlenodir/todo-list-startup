let elInput = findEl(".js-input");
let elList = findEl(".js-list");

let localData = localStorage.getItem("todos");
let todos = localData ? JSON.parse(localData) : [];

let handleDeleteTodo = (evt) => {
  console.log(evt.target.dataset.id);
  let FiltredArr = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== evt.target.dataset.id) {
      FiltredArr.push(todos[i]);
    }
  }
  todos = FiltredArr;
  localStorage.setItem("todos", JSON.stringify(FiltredArr));
  renderElements(FiltredArr);
};

let handleEditTodo = (evt) => {
  let edit = prompt(`Write your task...`);
  console.log(edit);
  console.log(evt.target.dataset.id);
  for (let i = 0; i < todos.length; i++) {
    if (evt.target.dataset.id === todos[i].id) {
      todos[i].title = edit;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderElements(todos);
    }
  }
};

let CheckedTodo = (evt) => {
  console.log(evt.target);
};

function createTodoItem(todo) {
  let todoItem = `
   <div class="align-items-center  d-flex px-3 py-2">
    <div class="m-0 align-items-center p-0 d-flex" >   
        <input type="checkbox" class="checked" data-id"${todo.id}">
        <p class="ms-2 mt-3">${todo.title}</p>
    </div>
        <div class="btn-box ms-auto ">
            <button class="btn btn-success edit" data-id="${todo.id}">Edit</button>
            <button class="btn btn-danger ms-1 delete"data-id="${todo.id}">Delete</button>
        </div>
   </div>     
    `;
  let elTodoItem = createEl("li");
  elTodoItem.className = "todo-item border";
  elTodoItem.innerHTML = todoItem;
  elList.appendChild(elTodoItem);

  // elList.addEventListener('click', handleDeleteTodo)
  let elEditbtn = document.querySelector(".edit");
  let elDeleteBtn = document.querySelector(".delete");
}

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete")) {
    handleDeleteTodo(evt);
  } else if (evt.target.matches(".edit")) {
    handleEditTodo(evt);
  } else if (evt.target.matches(".checked")) {
    CheckedTodo(evt);
  }
});

function renderElements(array) {
  elList.innerHTML = null;

  for (let i = 0; i < array.length; i++) {
    createTodoItem(array[i]);
  }
}

// var i = todos[-1] ? todos[-1].id : 1
function handleAddtodo(evt) {
  if (evt.keyCode === 13) {
    let newTodo = {
      id: uuid.v4(),
      title: elInput.value,
      isCompleted: false,
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderElements(todos);
    elInput.value = null;
  }
}

renderElements(todos);
elInput.addEventListener("keyup", handleAddtodo);
