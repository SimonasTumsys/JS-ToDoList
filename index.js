let doneContainer = document.querySelector('.done_container');
let taskInput = document.querySelector('#task_input')
let ul = document.createElement('ul');
doneContainer.insertAdjacentElement('beforebegin', ul);
let btn = document.querySelector('.btn_plus');
let progressBar = document.querySelector('.progress-bar');
const toDoListArray = [];

function addTaskToList(){
    if (taskInput.value !== ''){
        let taskText = taskInput.value;
        let id = idGenerator();
        let task = `<li class='list_item'>
        <input type='checkbox' class='checkbox'>
        <span class='task_text' id='${id}'>
        ${taskText}</span>
        <i class="bi bi-pencil-fill"></i>
        <i class="bi bi-trash-fill"></i>
        </li>`;
        ul.insertAdjacentHTML('beforeend', task);
        toDoListArray.push({
            "id": `${id}`,
            "todo": taskText,
            "isDone": false
        })
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

        for(let n of toDoListArray){
            if(span.id === n.id){
                n.isDone = !n.isDone;
            }
        }
    }
    else if(ev.target.className == 'bi bi-trash-fill'){
        let li = ev.target.parentNode;
        let spanId = ev.target.parentNode.childNodes[3].id
        let index = 0;
        for(let n of toDoListArray){
            if(spanId === n.id){
                index = toDoListArray.indexOf(n)
            }
        }
        toDoListArray.splice(index, 1);

        li.remove();
        resetProgress();
    }
    else if(ev.target.className == 'bi bi-pencil-fill'){
        let spanToBeEdited = ev.target.parentNode.childNodes[3];
        let spanId = spanToBeEdited.id;
        taskInput.value = spanToBeEdited.innerText;
        spanToBeEdited.innerText = '';
        let editBtn = document.createElement('button');
        editBtn.innerText = '+';
        editBtn.className = 'btn_edit';
        btn.insertAdjacentElement('afterend', editBtn);
        btn.setAttribute('style', 'display:none');
        editBtn.addEventListener('click', () => {
            spanToBeEdited.innerText = taskInput.value;
            let toDoEditedText = spanToBeEdited.innerText;
            editBtn.setAttribute('style', 'display:none');
            btn.setAttribute('style', 'display:block');
            taskInput.value = '';
            for(n of toDoListArray){
                if(spanId === n.id){
                    n.todo = toDoEditedText;
                }
            }
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
    let index = 0;
    for(let m of checkedTasks){
        for(let n of toDoListArray){
            if(m.id === n.id && n.isDone === true){
                index = toDoListArray.indexOf(n);
                toDoListArray.splice(index, 1);
            }
        }
    }
    resetProgress();
})

function idGenerator(){
    let taskId = Math.floor(Math.random()*99999)
    return taskId;
}

// window.onbeforeunload = function(){
//     localStorage.setItem('darbai', JSON.stringify(toDoListArray))
// }

// window.onload = function(){
//     localStorage.getItem(JSON.parse('darbai'))
// }


// const jsonData = {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   }

// const myObjectFromJson = JSON.parse(jsonData)


// console.log(jsonData.myObjectFromJson)

// localStorage.setItem('myCat', 'Kysia');

// const cat = localStorage.getItem('myCat');


// console.log(cat)

// localStorage.clear()