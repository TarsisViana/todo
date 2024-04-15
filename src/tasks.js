class Task{
  constructor(title, details, dueDate, prio, project){
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.prio = prio;
    this.id = Math.random().toString(36).slice(2, 11);

    if(project){
      this.project = project;
    }
  }

  getId(){
    return this.id
  }
  
}

export default Task;