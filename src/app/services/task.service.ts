import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    url="http://localhost:5000/tasks";
  constructor(private http:HttpClient) {} 
    findAll(){
       return  this.http.get<Task[ ]>(this.url);
    } 
    delete(id: number | undefined){
      return  this.http.delete(`${this.url}/${id}`);
   } 
   persist(task:Task){
    return this.http.post<Task>(this.url,task);
   }
  complited(id: number | undefined,completed: boolean){
     return this.http.patch(`${this.url}/${id}`,{completed: !completed})
  }
  update(task : Task){
     return this.http.put(`${this.url}/${task.id}`,task);
  }
}
