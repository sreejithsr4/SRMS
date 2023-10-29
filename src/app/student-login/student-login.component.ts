import { Component, OnInit, ViewRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit{
  student=this.fb.group({
    id:[''],
    psw:['']
  })
  constructor(private route:Router,private fb:FormBuilder,private ds:DataService){}
  ngOnInit(): void {
  
  }

  login(){
    var sid=this.student.value.id
    var psw=this.student.value.psw
    this.ds.login(sid,psw).subscribe({
      next:(result:any)=>{
        Swal.fire({
          icon:'success',
          text:result.message
        })
                localStorage.setItem("id",result.id)
        this.route.navigateByUrl("student")
        this.ds.header()
        },
        error:(result:any)=>{
          Swal.fire({
            icon:'error',
            text:result.error.message
          })
                  }
    })


  }
  signup(){
    this.route.navigateByUrl("register")
  }

}
