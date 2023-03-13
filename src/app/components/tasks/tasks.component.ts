import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  showForm=false;
  etatForm = false;
  serchText='';
  tasks: Task[] =[];
  resultSearchtasks: Task[] =[];
  mytask: Task={
    label:'',
    completed:false,
  }
  constructor(private taskService: TaskService){

  }
  ngOnInit(){
    this.getTasks();
  }
  getTasks(){
    this.taskService.findAll()
    .subscribe(taskss=>{ this.tasks = this.resultSearchtasks=taskss ;})
  }
  deleteTask(id: number | undefined){
    this.taskService.delete(id).subscribe(()  => {
       this.tasks= this.tasks.filter(task =>task.id != id )
    })
  }
  persistTask(){
    this.taskService.persist(this.mytask)
    .subscribe((task) => {
      this.resultSearchtasks = [task, ...this.tasks];
      this.reset();
      this.showForm=false;
    });
  }
  reset(){
    this.mytask={
      label: '',
      completed:false,
    }
  }

  toggleCompleted(task: Task){
      this.taskService.complited(task.id,task.completed)
         .subscribe(() =>{
          task.completed= !task.completed
         })
  }
    editTask(task: Task){
      this.mytask=task;
      this.etatForm=true;
      this.showForm=true;
    }
 updateTask(){
  return this.taskService.update(this.mytask)
               .subscribe(()=>{
                 this.reset();
                 this.etatForm=false;
                     this.showForm=false;
               })
 }
 serchTasks(){
  this.resultSearchtasks=this.tasks.filter((task)=> task.label.toLowerCase().includes(this.serchText.toLowerCase()) )
 }
}
