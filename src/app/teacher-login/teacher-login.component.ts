import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit{
teacher=this.fb.group({
  tid:[''],
  tpsw:['']
})
  constructor(private route:Router,private fb:FormBuilder,private ds:DataService){}
  ngOnInit(): void {
    
  }
  login(){
    var tid=this.teacher.value.tid
    var tpsw=this.teacher.value.tpsw

    this.ds.tlogin(tid,tpsw).subscribe({
      next:(result:any)=>{
        Swal.fire({
          icon:'success',
          title:result.message
        })
        this.route.navigateByUrl("teacher/"+tid)
        localStorage.setItem("id",result.id)
        this.ds.header()
      },
      error:(result:any)=>{
        Swal.fire({
          icon:'error',
          title:result.error.message
        })
      }
    })
  }
  signup(){
    this.route.navigateByUrl("teacher-register")
  }

}
