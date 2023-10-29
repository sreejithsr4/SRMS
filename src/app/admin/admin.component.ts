import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  id:any=""
teacherdata:any=[]
  studentData:any=[]
  classdata:any=[]
  testData:any=""
  subjectdata:any=""
  constructor(private route:Router,private ds:DataService){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      this.id=localStorage.getItem("id")
      
      this.route.navigateByUrl("")
    }

      this.test()
      this.student()
      this.teacher()
      this.class()
      this.subject()
 
   
  }
  subject(){
    this.ds.viewsubject().subscribe({
      next:(result:any)=>{
        this.subjectdata=result.message
      }
    })
  }
  class(){
    this.ds.classdata().subscribe({
      next:(result:any)=>{
        this.classdata=result.message
      }
    })
  }
  // Student Data Collection
  student(){
    this.ds.studentData().subscribe({
      next:(result:any)=>{
        this.studentData=result.user
        
      },
      error:(result:any)=>{
        alert(result.error.messsage)
      }
    })
  }

  // teacher data collection
  teacher(){
    this.ds.teacherData().subscribe({
next:(result:any)=>{
  this.teacherdata=result.user
  
},
error:(result:any)=>{
  alert(result.error.message)
}
    })
  }

logout(){
  localStorage.removeItem("id")
  localStorage.removeItem("token")

  this.route.navigateByUrl("")
  this.ds.header()
}
test(){
  this.ds.gettest().subscribe({
    next:(result:any)=>{
      this.testData=result.message
    }
  })
}
 
  

}
