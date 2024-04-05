import './style.css';
import {format} from 'date-fns';
import Task from './tasks';
import Project from './projects';
import {updateHome, init, getNewTask, editTask} from './DOMmodule.js'



const controller = (()=>{
  init()
  const allTasks = [];

  //add default tasks
  addTask(['Make bed','', format(new Date, 'dd/MM/yy'), 'low']);
  addTask(['Do the dishes', 'it stinks', format(new Date(2024,4,5), 'dd/MM/yy')]);


  //link eventListeners
  const taskForm = document.querySelector('form#new-task');
  const projectForm = document.querySelector('form#new-project');

  taskForm.addEventListener('submit', taskformHandler);



  


  function addTask([title,details,date,prio]){
    const task = new Task(title, details, date, prio);
    allTasks.push(task);
    updateHome(allTasks);
    console.log(allTasks);
  }

  function taskformHandler(form){
    addTask(getNewTask(form.target));
    editTask();
  }

})();


