import './style.css';
import {format, compareAsc, isThisWeek} from 'date-fns';
import Task from './tasks';
import Project from './projects';
import {renderTaskList, initListeners, getNewTask, editTaskDom,
getNewProject, renderProjectList, showTaskDetail} from './DOMmodule.js'



const controller = (()=>{
  initListeners()
  const allTasks = [];
  const allProjects = [];
  let taskId;


  //add default tasks, inicialize screen
  addDefauts();


  //link eventListeners
  const taskForm = document.querySelector('form#new-task');
  const projectForm = document.querySelector('form#new-project');
  const editForm = document.querySelector('form#edit-task');
  const homeBtn = document.querySelector('#home-btn');
  const todayBtn = document.querySelector('#today-btn');
  const thisWeekBtn = document.querySelector('#week-btn');
  

  taskForm.addEventListener('submit', taskformHandler);
  projectForm.addEventListener('submit', projectFormHandler);
  editForm.addEventListener('submit', editFormhandler);
  homeBtn.addEventListener('click', () => updateTasklist(allTasks, 'HomeDefault'));
  todayBtn.addEventListener('click', () => showToday(allTasks));
  thisWeekBtn.addEventListener('click', () => showThisWeek(allTasks));



  function updateTasklist(array,title){
    renderTaskList(array,title);
    bindTaskListeners();
  }

  function addTask([title,details,date,prio,pageTitle]){

    // test for project
    if( pageTitle == 'Home' || pageTitle == 'Today' || pageTitle == 'This Week'){
      var task = new Task(title, details, date, prio);

      allTasks.push(task);
      allTasks.sort(sortByDate);
      updateTasklist(allTasks);
      updateTaskStorage(allTasks);
    }else{
      var task = new Task(title, details, date, prio, pageTitle);
      console.log(task);

      allTasks.push(task);
      allTasks.sort(sortByDate);
      showProject(allTasks, pageTitle);
      updateTaskStorage(allTasks);
    }
  }

  function deleteTask(event){
    const taskId = event.target.parentElement.id;
    const index = allTasks.findIndex(task => task.id === taskId);
    allTasks.splice(index,1);
    updateTasklist(allTasks);
    updateTaskStorage(allTasks);
  }

  function taskformHandler(e){
    addTask(getNewTask(e.target));
  }

  function editFormhandler(e){ 
    //delete old task
    const index = allTasks.findIndex(task => task.id === taskId);
    allTasks.splice(index,1);

    // add new task
    addTask(getNewTask(e.target));

  }


  function sortByDate(a,b){
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    return compareAsc(dateA, dateB);
  }

  

  function addDefauts(){
    if(localStorage.getItem('allTasks')){
      populateAlltasks();
      updateTasklist(allTasks);
    }else{
      addTask(['Make bed','just do it', format(new Date, 'yyyy-MM-dd'), 'low']);
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
    updateTasklist(todayArray, 'TodayDefault');
  }

  function showThisWeek(array){
    const weekArray = array.filter((task) => isThisWeek(new Date(task.dueDate)));
    updateTasklist(weekArray, 'ThisWeekDefault');
  }

  function bindTaskListeners(){
    const domTasks = document.querySelectorAll('li.task');

    domTasks.forEach((listItem) => {
      listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
      listItem.querySelector('.edit-btn').addEventListener('click', (e) =>{
        editTaskDom(allTasks.find(task => task.id === e.target.parentElement.id));
        taskId = e.target.parentElement.id;
      });
      listItem.querySelector('.task.expand').addEventListener('click', showTaskDetail);
    })
  }
  
  // Project logic

  function addNewProject(name){
    const project = new Project(name);
    allProjects.push(project);
    updateProjectList(allProjects);
    updateProjectStorage(allProjects);
    showProject([], name);
  }


  function projectFormHandler(form){
    addNewProject(getNewProject(form.target));
  }

  function updateProjectList(array){
    renderProjectList(array);
    bindProjectListeners();
  }

  function bindProjectListeners(){
    const projList = document.querySelector('.project-list');

    projList.addEventListener('click', projectListBtnHandler)
  }


  function projectListBtnHandler(e){
    if (e.target.classList.value === 'project delete'){
      const projId = e.target.parentElement.id;
      const index = allProjects.findIndex(project => project.id === projId);
      allProjects.splice(index,1);
      updateProjectList(allProjects);
      updateProjectStorage(allProjects);
    }
    else if(e.target.classList.value === 'project select button'){
      const proj = e.target.textContent;
      showProject(allTasks, proj);
    }
  }

  function showProject(array, project){
    const projectArray = [];

    array.forEach((task) =>{
      if (task.project === project) projectArray.push(task);
    })
    updateTasklist(projectArray, project);
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


