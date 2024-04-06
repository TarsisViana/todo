import './style.css';
import {format, compareAsc} from 'date-fns';
import Task from './tasks';
import Project from './projects';
import {renderTaskList, initListeners, getNewTask, editTask} from './DOMmodule.js'



const controller = (()=>{
  initListeners()
  const allTasks = [];

  //add default tasks, inicialize screen
  addDefauts();


  //link eventListeners
  const taskForm = document.querySelector('form#new-task');
  const projectForm = document.querySelector('form#new-project');
  const editForm = document.querySelector('form#edit-task');
  const homeBtn = document.querySelector('#home-btn');
  const todayBtn = document.querySelector('#today-btn');

  taskForm.addEventListener('submit', taskformHandler);
  homeBtn.addEventListener('click', () => updateTasklist(allTasks));
  todayBtn.addEventListener('click', () => showToday(allTasks));
  



  function updateTasklist(array){
    renderTaskList(array);
    bindTaskListeners();
  }

  function addTask([title,details,date,prio]){
    const task = new Task(title, details, date, prio);
    allTasks.push(task);
    allTasks.sort(sortByDate);
    updateTasklist(allTasks);
    updateStorage(allTasks);
  }

  function deleteTask(event){
    const taskId = event.target.parentElement.id;
    const index = allTasks.findIndex(task => task.id === taskId);
    allTasks.splice(index,1);
    updateTasklist(allTasks);
    console.log(allTasks)
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
      updateTasklist(allTasks);
    }else{
      addTask(['Make bed','', format(new Date, 'yyyy-MM-dd'), 'low']);
      addTask(['Do the dishes', 'it stinks', '2024-04-06']);
    }  
  }

  
  function showToday(array){
    const today = format(new Date, 'yyyy-MM-dd');
    const todayArray = [];
  
    array.forEach((task) =>{
      if (task.dueDate === today) todayArray.push(task);
    })
    updateTasklist(todayArray);
  }

  function bindTaskListeners(){
    const domTasks = document.querySelectorAll('li.task');

    domTasks.forEach((listItem) => {
      listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
      listItem.querySelector('.edit-btn').addEventListener('click', editTask);
    })
  }
  












  //storage functions
  function updateStorage(allTasks){
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
  };

  function populateAlltasks(){
    const newArray = JSON.parse(localStorage.getItem('allTasks'));
    allTasks.push(...newArray);
  }

})();


