class Tasks{
  constructor(title, details, due, prio, project){
    this.title = title;
    this.details = details;
    this.due = due;
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

export default Tasks;