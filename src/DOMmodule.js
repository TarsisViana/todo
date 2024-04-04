const taskDialog = document.querySelector('.task.dialog')
const addTaskbtn = document.querySelector('#add-task');

function updateHome(array){
  const contentDiv = document.querySelector('#task-container');
  contentDiv.innerHTML = '';

  array.forEach(element => {
    const p = document.createElement('p');
    p.textContent = element.title; 
    contentDiv.appendChild(p);
  });


}

export { updateHome, init, getNewTask, editTask };

function renderTask(task){
  const title = document.createElement('p');
  const dueDate = document.createElement('p');



  p.textContent = element.title; 

}

function init(){
  addTaskbtn.addEventListener('click', () => {
    taskDialog.showModal();
  });
}

function getNewTask(form){
  const elements = form.elements;
  
  const title = elements[1].value;
  const details = elements[2].value;
  const date = elements[3].value;
  const prio = elements[4].value;
  
  form.reset();

  return [title, details, date, prio];
}

function editTask(){
  const title = taskDialog.querySelector('#title');
  title.setAttribute('value', 'laksdjflkasdljf');
  taskDialog.showModal();
  console.log('hey')
}

