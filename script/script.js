const myLabel = document.querySelector('div label');
const myInput = document.getElementById('task-input');
const btnAddTasks = document.getElementById('add-task');
const taskContainer = document.getElementById('tasks');
let myArray = [];

getDataFromLocalStorage();

btnAddTasks.onclick = () => {
    if (myInput.value.trim() !== '') {
        let idVar = Date.now().toString();
        addTaskOntaskContainer(idVar, myInput.value);
        addDataTolocalStorage(idVar, myInput.value);
        myInput.value = '';
        myLabel.style.opacity = '1';
        myLabel.style.color = '#333';
        myLabel.style.top = '12px';
    }
};

// ckek taskContainer is empty or no
// function chekOnTaskContainer() {
//     const title = `<h2 class='info'>No Tasks</h2>`;
//     if (taskContainer.innerHTML.trim() === '') {
//         taskContainer.innerHTML = title;
//     } else if (taskContainer.innerHTML.trim() !== '') {
//         document.querySelector('.info').remove();
//     };
// };

function addTaskOntaskContainer(id, taskText) {
    let taskBox = document.createElement('div');
    taskBox.innerHTML = `<span>${taskText}</span><button class='delete'>Delete</button>`;
    taskContainer.appendChild(taskBox);
    taskBox.setAttribute('data-id', id);
};

// delete task from container and localStorage
taskContainer.addEventListener('click', btn => {
    let parentBtn = btn.target.parentElement;
    if (btn.target.classList.contains('delete')) {
        parentBtn.remove();
        myArray = myArray.filter(task => task.id != parentBtn.getAttribute('data-id'));
        localStorage.setItem('tasks', JSON.stringify(myArray));
    }
});

function addDataTolocalStorage(id, task) {
    let taskObject= {
        id: id,
        text: task,
    };
    myArray.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(myArray));
};

function getDataFromLocalStorage() {
    if (localStorage.getItem('tasks')) {
        myArray = JSON.parse(localStorage.getItem('tasks'));
        myArray.forEach(obj => {
            addTaskOntaskContainer(obj.id, obj.text);
        });
    };
};

function eventFocusInInput() {
    myInput.addEventListener('focus', () => {
        myLabel.style.top = '-22px';
        myLabel.style.color = '#fff';
    });
};


function eventblurInInput() {
    myInput.addEventListener('blur', () => {
        if (myInput.value.trim() !== '') {
            myLabel.style.opacity = '0';
        } else {
            myLabel.style.opacity = '1';
            myLabel.style.color = '#333';
            myLabel.style.top = '12px';
        }
    });
};

eventFocusInInput();
eventblurInInput();
