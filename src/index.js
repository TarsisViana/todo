import './style.css';
import {format, compareAsc} from 'date-fns';
import Task from './tasks';
import Project from './projects';
import {updateHome, initListeners, getNewTask, editTask} from './DOMmodule.js'



const controller = (()=>{
  initListeners()
  const allTasks = [];

  //add default tasks, inicialize screen
  addDefauts();


  //link eventListeners
  const taskForm = document.querySelector('form#new-task');
  const projectForm = document.querySelector('form#new-project');
  const editForm = document.querySelector('form#edit-task');

  taskForm.addEventListener('submit', taskformHandler);


  


  function addTask([title,details,date,prio]){
    const task = new Task(title, details, date, prio);
    allTasks.push(task);
    allTasks.sort(sortByDate);
    updateHome(allTasks);
    updateStorage(allTasks);
  }

  function sortByDate(a,b){
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    return compareAsc(dateA, dateB);
  }

  function taskformHandler(form){
    addTask(getNewTask(form.target));
  }

  

  function addDefauts(){
    if(localStorage.getItem('allTasks')){
      populateAlltasks();
      updateHome(allTasks);
    }else{
      addTask(['Make bed','', format(new Date, 'yyyy-MM-dd'), 'low']);
      addTask(['Do the dishes', 'it stinks', '2024-04-06']);
    }  
  }

  //storage functions
  function updateStorage(allTasks){
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
  };

  function populateAlltasks(array){
    const newArray = JSON.parse(localStorage.getItem('allTasks'));
    allTasks.push(...newArray);
  }


})();



