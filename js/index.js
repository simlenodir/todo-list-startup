let elInput = findEl('.js-input')
let elList = findEl('.js-list')

let localData = localStorage.getItem('todos');
let todos =JSON.parse(localData) ? JSON.parse(localData) : [];
console.log(JSON.parse(localData));
function createTodoItem(todo){
    let todoItem = `
   <div class="align-items-center  d-flex px-3 py-2">
    <div class="m-0 align-items-center p-0 d-flex" >   
        <input type="checkbox">
        <p class="ms-2 mt-3">${todo.title}</p>
    </div>
        <div class="btn-box ms-auto ">
            <button class="btn btn-success">Edit</button>
            <button class="btn btn-danger ms-1">Delete</button>
        </div>
   </div>     
    `
let elTodoItem = createEl('li');
elTodoItem.className = "todo-item border"
elTodoItem.innerHTML = todoItem
elList.appendChild(elTodoItem)

}


function renderElements(array){
    elList.innerHTML= null

    for (let i = 0; i < array.length; i++) {
        createTodoItem(array[i]);
       
    }
}

var i = todos[-1] ? todos[-1].id : 1
function handleAddtodo(evt) {
    if (evt.keyCode === 13){
        let newTodo = {
            id: uuid.v4(),
            title : elInput.value,
            isCompleted: false,
        };
        todos.unshift(newTodo)
        localStorage.setItem('todos',JSON.stringify(todos));
        renderElements(todos);
        elInput.value = null
       
    }
}
console.log(todos);
renderElements(todos);
elInput.addEventListener('keyup', handleAddtodo);
