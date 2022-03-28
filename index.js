let doneContainer = document.querySelector('.done_container');
let taskInput = document.querySelector('#task_input')
let ul = document.createElement('ul');
doneContainer.insertAdjacentElement('beforebegin', ul);
let btn = document.querySelector('.btn');

function addTaskToList(){
    const taskArray = [];
    if (taskInput.value !== ''){
        let taskText = taskInput.value;
        let task = `<li class='list_item'>
        <input type='checkbox' class='checkbox'>${taskText}
        <i class="bi bi-pencil-fill"></i>
        <i class="bi bi-trash-fill"></i>
        </li>`;
        ul.insertAdjacentHTML('beforeend', task);
    }
    taskInput.value = '';
}

btn.addEventListener('click', addTaskToList);

