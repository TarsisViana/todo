import {format} from 'date-fns';
export { renderTaskList, initListeners, getNewTask, editTask };

const addTaskDialog = document.querySelector('.task.dialog')


function renderTaskList(array){
  const taskList = document.querySelector('ul.task-list');
  taskList.innerHTML = '';

  array.forEach( task => {
    taskList.appendChild(renderTask(task)); 
  });
}



function renderTask(task){
  const listItem = document.createElement('li');
  const title = document.createElement('p');
  const dueDate = document.createElement('p'); 
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
 
  title.setAttribute('class', 'task title');
  dueDate.setAttribute('class', 'task due-date');
  editBtn.setAttribute('class', 'task edit-btn');
  deleteBtn.setAttribute('class', 'task delete-btn');
  listItem.setAttribute('class', 'task');
  listItem.setAttribute('id', task.id);
  
  if(task.prio === 'high'){
    listItem.setAttribute('prio', 'high');
  }else if(task.prio === 'medium'){
    listItem.setAttribute('prio', 'medium');
  }else{
    listItem.setAttribute('prio', 'low');
  }

  title.textContent = task.title;
  dueDate.textContent = format(new Date(task.dueDate), 'dd/MM/yy');
  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'delete';


  listItem.appendChild(title);
  listItem.appendChild(dueDate);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);



  return listItem;

}

function initListeners(){
  const addTaskbtn = document.querySelector('#add-task');
  const cancelTaskbtn = document.querySelector('button.add.task.cancel');
  const form = addTaskDialog.querySelector('form');

  addTaskbtn.addEventListener('click', () => {
    addTaskDialog.showModal();
  });

  cancelTaskbtn.addEventListener('click', () => {
    addTaskDialog.close();
    form.reset();
  })

}

function getNewTask(form){
  const elements = form.elements;
  
  const title = elements[1].value;
  const details = elements[2].value;
  const dueDate = format(elements[3].valueAsDate,'yyyy-MM-dd');
  const prio = elements[4].value;
  
  form.reset();

  return [title, details, dueDate, prio];
}

function editTask(){
  const title = addTaskDialog.querySelector('#title');
  title.setAttribute('value', 'laksdjflkasdljf');
  addTaskDialog.showModal();
}
