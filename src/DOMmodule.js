import {add, format} from 'date-fns';
export { renderTaskList, initListeners, getNewTask, editTask, getNewProject, renderProjectList };

const addTaskDialog = document.querySelector('.task.dialog');
const addProjectDialog = document.querySelector('.project.dialog');


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
  const cancelTaskBtn = document.querySelector('button.add.task.cancel');
  const addProjectBtn = document.querySelector('#add-project');

  addTaskbtn.addEventListener('click', () => {
    addTaskDialog.showModal();
  });

  cancelTaskBtn.addEventListener('click', () => {
    addTaskDialog.close();
    form.reset();
  })

  addProjectBtn.addEventListener('click', () =>{
    addProjectDialog.showModal();
  } )
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

function getNewProject(form){

  const name = form.elements[1].value;
  form.reset();

  return name;
}


function renderProject(project){

  const listItem = document.createElement('li');
  const name = document.createElement('button');
  const deleteBtn = document.createElement('button');

  listItem.setAttribute('class', 'project');
  listItem.setAttribute('id', project.id);
  name.setAttribute('class', 'project select button');
  deleteBtn.setAttribute('class', 'project delete');


  name.textContent = project.name;
  deleteBtn.textContent = 'x';

  listItem.appendChild(name);
  listItem.appendChild(deleteBtn);
  
  return listItem;
}

function renderProjectList(array){
  const projectList = document.querySelector('ul.project-list');
  projectList.innerHTML = '';

  array.forEach( project => {
    projectList.appendChild(renderProject(project)); 
  });
}