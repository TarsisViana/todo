import {add, format} from 'date-fns';
export { renderTaskList, initListeners, getNewTask, editTaskDom, getNewProject, renderProjectList, showTaskDetail };

const addTaskDialog = document.querySelector('.task.dialog');
const addProjectDialog = document.querySelector('.project.dialog');
const editTaskDialog = document.querySelector('.edit.task.dialog')

function renderTaskList(array, title){
  const taskList = document.querySelector('ul.task-list');
  const pageTitle = document.querySelector('p.content.header');

  taskList.innerHTML = '';

  array.forEach( task => {
    taskList.appendChild(renderTask(task)); 
  });

  if(title === 'HomeDefault') pageTitle.innerHTML = 'Home';
  else if(title === 'TodayDefault') pageTitle.innerHTML = 'Today';
  else if(title === 'ThisWeekDefault') pageTitle.innerHTML = 'This Week';
  else if(!title) pageTitle.innerHTML = 'Home';
  else pageTitle.textContent = title;

}



function renderTask(task){
  const listItem = document.createElement('li');
  const title = document.createElement('p');
  const dueDate = document.createElement('p'); 
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const expandBtn = document.createElement('button');
  const detailsDialog = document.createElement('dialog');
 
  title.setAttribute('class', 'task title');
  dueDate.setAttribute('class', 'task due-date');
  editBtn.setAttribute('class', 'task edit-btn');
  deleteBtn.setAttribute('class', 'task delete-btn');
  listItem.setAttribute('class', 'task');
  listItem.setAttribute('id', task.id);
  expandBtn.setAttribute('class', 'task expand');
  detailsDialog.setAttribute('class', 'task details');
  
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
  expandBtn.textContent = '···';
  detailsDialog.textContent = task.details;


  title.appendChild(expandBtn);
  title.appendChild(detailsDialog);
  listItem.appendChild(title);
  listItem.appendChild(dueDate);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);



  return listItem;

}

function  showTaskDetail(e){
  const detailsDialog = e.target.parentElement.querySelector('dialog');
  detailsDialog.toggleAttribute('open');
}

function initListeners(){
  const addTaskbtn = document.querySelector('#add-task');
  const cancelTaskBtn = document.querySelector('button.add.task.cancel');
  const addProjectBtn = document.querySelector('#add-project');
  const cancelEditBtn = document.querySelector('.cancel.edit')

  addTaskbtn.addEventListener('click', () => {
    addTaskDialog.showModal();
  });

  cancelTaskBtn.addEventListener('click', (e) => {
    const form = e.target.parentElement.parentElement;
    form.reset();
    addTaskDialog.close();
  })

  cancelEditBtn.addEventListener('click', (e) => {
    const form = e.target.parentElement.parentElement;
    form.reset();
    editTaskDialog.close();
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
  const pageTitle = document.querySelector('p.content.header').textContent;
  
  form.reset();

  return [title, details, dueDate, prio, pageTitle];
}

function editTaskDom(task){

  const title = editTaskDialog.querySelector('#title');
  const details = editTaskDialog.querySelector('#details');
  const dueDate = editTaskDialog.querySelector('#due');
  const prio = editTaskDialog.querySelector('#piority');

  title.value = task.title;
  details.value = task.details;
  dueDate.value = task.dueDate;

  editTaskDialog.showModal();
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