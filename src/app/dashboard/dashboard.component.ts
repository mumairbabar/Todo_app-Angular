import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  taskObj:Task = new Task();
  taskArray:any = [];
  editTaskValue:string = '';

  addTaskValue:string = '';

  constructor(private crudService : CrudService){}

  ngOnInit(){
    this.editTaskValue = '';
    this.addTaskValue = ''
    this.taskObj = new Task();
    this.taskArray = [];
    this.getAllTasks();

  }
  getAllTasks() {
    this.crudService.getAllTasks().subscribe(result=>{
      this.taskArray = result;
    },err=>{
      alert("unable to get the list of tasks")
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj)
      .subscribe(result =>{
        this.ngOnInit();
        this.addTaskValue = '';
      },err=>{
        alert(err)
      })
  }


  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(result=>{
      this.ngOnInit();

    },err=>{
      alert("Cannot Edit")
    })
  }

  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(result=>{
      this.ngOnInit();
    },err=>{
      alert("Unable to Delete")
    })
  }

  call(etask:Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;

  }

}
