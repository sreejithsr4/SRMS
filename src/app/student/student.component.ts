import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  studentData:any=""
  constructor (private ds:DataService,private route:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    this.student()
   
  }
  student(){
    if(localStorage.getItem("id")){
      var id= localStorage.getItem("id")
      this.ds.studentonedata(id).subscribe({
        next:(result:any)=>{
          
          this.studentData=result.message
          
        }
      })
    }
    
  }
  edit(){
    this.route.navigateByUrl("edit-student")

  }
  logout(){
    localStorage.removeItem("id")
    this.route.navigateByUrl("")

  }

}
