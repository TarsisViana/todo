export default class Project{
  constructor(name){
    this.name = name;
    this.taskList = [];
  }

  addTask(task){
    this.taskList.push(task);
  }

  deleteTask(task){
    this.taskList.splice()
  }

  findTask(task) {
    this.taskList.find((task) => {
    return task.title === 'Make bed'
    })
  }
}