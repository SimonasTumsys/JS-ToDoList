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
    }
    taskInput.value = '';
    //progressBar resets after adding tasks:
    allTaskCount = document.querySelectorAll('LI').length;
    progressBar.innerText = `${doneTaskCount} out of ${allTaskCount}`;
    progressBarValue = (doneTaskCount / allTaskCount)*100
    progressBar.setAttribute("style", `width:${progressBarValue}%`)
}



btn.addEventListener('click', addTaskToList);

//Progress bar label:
let doneTaskCount = 0;
allTaskCount = document.querySelectorAll('LI').length;
progressBar.innerText = `${doneTaskCount} out of ${allTaskCount}`;



let taskList = document.querySelector('ul');
taskList.addEventListener('click', function(ev){
    if(ev.target.tagName == 'INPUT'){
        let span = ev.target.parentNode.childNodes[3]
        span.classList.toggle('task_checked')
        resetProgress()
    }
    else if(ev.target.className == 'bi bi-trash-fill'){
        let li = ev.target.parentNode
        li.remove()
        resetProgress()
    }
    else if(ev.target.className == 'bi bi-pencil-fill'){
    }
}, false)

function resetProgress(){
    doneTaskCount = document.getElementsByClassName('task_checked').length;
    allTaskCount = document.querySelectorAll('LI').length;
    progressBar.innerText = `${doneTaskCount} out of ${allTaskCount}`
    let progressBarValue = (doneTaskCount / allTaskCount)*100
    if(allTaskCount > 0){
        progressBar.setAttribute("style", `width:${progressBarValue}%`)
    } else {progressBar.setAttribute("style", `width:0%`)}
}


let removeCheckedBtn = document.querySelector('.rm_checked');

removeCheckedBtn.addEventListener('click', function(){
    let checkedTasks = document.querySelectorAll('.task_checked');
    for(let i of checkedTasks) {
        i.parentNode.remove()
    }
    resetProgress()
})



// for(let i = 0; i < taskList.length; i++){
//     let checkbox = taskList[i].childNodes[0]
//     console.log(checkbox)
//     checkbox.addEventListener('click', function(event){
//         let span = event.target.nextElementSibling
//         span.classList.toggle('task_checked')
//         console.log(span)
//     }) 
// }


// function checkboxEvents(){
//     let taskList = document.getElementsByTagName('UL');
//     for(let i = 0; i < taskList.length; i++){
//         let checkbox = taskList[i]
//         console.log(checkbox)
        // checkbox.addEventListener('click', function(event){
        //     let span = event.target.nextElementSibling
        //     //span.classList.toggle('task_checked')
        //     console.log(span)
        // })
        // pencil = taskList[i].childNodes[3]
        // console.log(pencil)
//     }

// }
    


// function pencilEvents(){
//     let pencil = document.getElementsByClassName('bi bi-pencil-fill');
//     for(let i = 0; i < pencil.length; i++){
//         pencil[i].onclick = function(){
//             console.log('clicked')
//         }
//     }
// }

// function trashCanEvents(){
//     let trashCan = document.getElementsByClassName('bi bi-trash-fill');
//     for(let i = 0; i < trashCan.length; i++){
//         trashCan[i].onclick = function(){
//             console.log('trashed')
//         }
//     }
// }

