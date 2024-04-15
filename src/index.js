import './style.css';
import {format, compareAsc} from 'date-fns';
import Task from './tasks';
import Project from './projects';
import {renderTaskList, initListeners, getNewTask, editTask,
getNewProject, renderProjectList} from './DOMmodule.js'



const controller = (()=>{
  initListeners()
  const allTasks = [];
  const allProjects = [];


  //add default tasks, inicialize screen
  addDefauts();


  //link eventListeners
  const taskForm = document.querySelector('form#new-task');
  const projectForm = document.querySelector('form#new-project');
  const editForm = document.querySelector('form#edit-task');
  const homeBtn = document.querySelector('#home-btn');
  const todayBtn = document.querySelector('#today-btn');
  

  taskForm.addEventListener('submit', taskformHandler);
  projectForm.addEventListener('submit', projectFormHandler)
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
    updateTaskStorage(allTasks);
  }

  function deleteTask(event){
    const taskId = event.target.parentElement.id;
    const index = allTasks.findIndex(task => task.id === taskId);
    allTasks.splice(index,1);
    updateTasklist(allTasks);
    updateTaskStorage(allTasks);
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
      addTask(['Do the dishes', 'it stinks', format(new Date, 'yyyy-MM-dd')]);
    }
    if(localStorage.getItem('allProjects')){
      populateAllProjects();
      updateProjectList(allProjects);
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
  

  function addNewProject(name){
    const project = new Project(name);
    allProjects.push(project);
    updateProjectList(allProjects);
    updateProjectStorage(allProjects);
  }


  function projectFormHandler(form){
    console.log(form.target)
    addNewProject(getNewProject(form.target));
  }

  function updateProjectList(array){
    renderProjectList(array);
    bindProjectListeners();
  }

  function bindProjectListeners(){
    const projList = document.querySelector('.project-list');

    projList.addEventListener('click', deleteProject)
  }


  function deleteProject(e){
    if (e.target.classList.value === 'project delete'){
      const projId = e.target.parentElement.id;
      const index = allProjects.findIndex(project => project.id === projId);
      allProjects.splice(index,1);
      updateProjectList(allProjects);
      updateProjectStorage(allProjects);
    }
  }

  //storage functions
  function updateTaskStorage(allTasks){
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
  };

  function populateAlltasks(){
    const newArray = JSON.parse(localStorage.getItem('allTasks'));
    allTasks.push(...newArray);
  }
  
  function updateProjectStorage(array){
    localStorage.setItem('allProjects', JSON.stringify(array));
  }

  function populateAllProjects(){
    const newArray = JSON.parse(localStorage.getItem('allProjects'));
    allProjects.push(...newArray);
  }

})();


