import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css'],
  providers: [DatePipe]
})
export class TeacherRegisterComponent implements OnInit{
subjectdata:any=""
  mydate:any= new Date()
  pswCheck:any=false
  tRegister=this.fb.group({
    id:['',[Validators.required,Validators.pattern('[0-9]+')]],
    name:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
    subject:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]],
    cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @.]+')]]
  })
  constructor(private fb:FormBuilder,private ds:DataService,private route:Router,private date:DatePipe){
    this.mydate = this.date.transform(this.mydate, 'short');

  }
  ngOnInit(): void {
    this.ds.viewsubject().subscribe({
      next:(result:any)=>{
        this.subjectdata=result.message
      }
    })
  }

  signup(){
    var path=this.tRegister.value
    var tid=path.id
    var name=path.name
    var subject=path.subject
    var tpsw=path.psw
    var cpsw=path.cpsw
    var date=this.mydate
   
    if(subject=="")
    {
      Swal.fire({
        icon:'info',
        title:"Select a subject"
      })
    }
    else{
      if(tpsw==cpsw){
        if(this.tRegister.valid){
          this.ds.tregister(tid,name,subject,tpsw,date).subscribe({
            next:(result:any)=>{
              this.route.navigateByUrl("")
              alert(result.message)
    
            },
            error:(result:any)=>{
              alert(result.error.message)
            }
          })
        }
        else{
          Swal.fire({
            icon:'warning',
            title:"Enter Valid Details"
          })

        }

      }
      else{
        this.pswCheck=true
      }
    }


  }

}
