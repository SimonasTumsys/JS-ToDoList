let doneContainer = document.querySelector('.done_container');
let taskInput = document.querySelector('#task_input')
let ul = document.createElement('ul');
doneContainer.insertAdjacentElement('beforebegin', ul);
let btn = document.querySelector('.btn_plus');
let progressBar = document.querySelector('.progress-bar');

function addTaskToList(){
    if (taskInput.value !== ''){
        let taskText = taskInput.value;
        let task = `<li class='list_item'>
        <input type='checkbox' class='checkbox'>
        <span class='task_text'>${taskText}</span>
        <i class="bi bi-pencil-fill"></i>
        <i class="bi bi-trash-fill"></i>
        </li>`;
        ul.insertAdjacentHTML('beforeend', task);
    } else {alert('Please input a task!')}
    taskInput.value = '';
    //progressBar resets after adding tasks:
    allTaskCount = document.querySelectorAll('LI').length;
    progressBar.innerText = `${doneTaskCount} out of ${allTaskCount}`;
    progressBarValue = (doneTaskCount / allTaskCount)*100;
    if(allTaskCount > 0){
        progressBar.setAttribute("style", `width:${progressBarValue}%`)
    } else {progressBar.setAttribute("style", `width:0%`)}
}



btn.addEventListener('click', addTaskToList);

//Progress bar label:
let doneTaskCount = 0;
allTaskCount = document.querySelectorAll('LI').length;
progressBar.innerText = `${doneTaskCount} out of ${allTaskCount}`;



let taskList = document.querySelector('ul');
taskList.addEventListener('click', function(ev){
    if(ev.target.tagName == 'INPUT'){
        let span = ev.target.parentNode.childNodes[3];
        span.classList.toggle('task_checked');
        resetProgress();
    }
    else if(ev.target.className == 'bi bi-trash-fill'){
        let li = ev.target.parentNode;
        li.remove();
        resetProgress();
    }
    else if(ev.target.className == 'bi bi-pencil-fill'){
        let spanToBeEdited = ev.target.parentNode.childNodes[3];
        taskInput.value = spanToBeEdited.innerText;
        spanToBeEdited.innerText = '';
        let editBtn = document.createElement('button');
        editBtn.innerText = '+';
        editBtn.className = 'btn_edit';
        btn.insertAdjacentElement('afterend', editBtn);
        btn.setAttribute('style', 'display:none');
        editBtn.addEventListener('click', () => {
            spanToBeEdited.innerText = taskInput.value;
            editBtn.setAttribute('style', 'display:none');
            btn.setAttribute('style', 'display:block');
            taskInput.value = '';
        })
    }
}, false)



function resetProgress(){
    doneTaskCount = document.getElementsByClassName('task_checked').length;
    allTaskCount = document.querySelectorAll('LI').length;
    progressBar.innerText = `${doneTaskCount} out of ${allTaskCount}`;
    let progressBarValue = (doneTaskCount / allTaskCount)*100;
    if(allTaskCount > 0){
        progressBar.setAttribute("style", `width:${progressBarValue}%`);
    } else {progressBar.setAttribute("style", `width:0%`)}
}



let removeCheckedBtn = document.querySelector('.rm_checked');

removeCheckedBtn.addEventListener('click', function(){
    let checkedTasks = document.querySelectorAll('.task_checked');
    for(let i of checkedTasks) {
        i.parentNode.remove();
    }
    resetProgress();
})

