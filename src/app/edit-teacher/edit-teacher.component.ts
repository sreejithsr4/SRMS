import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit{
  teacherForm=this.fb.group({
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]],
    cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]],
    oldpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]]
  })
  subjectdata:any=""
  id:any=""
  teacherdata:any={}
  pswCheck:any=false

  constructor(private ds:DataService,private ar:ActivatedRoute,private fb:FormBuilder,private route:Router){}
  ngOnInit(): void {
    this.pswCheck=false


if(localStorage.getItem("id")){
  this.id=localStorage.getItem("id")
}
else{
  this.route.navigateByUrl("")
}

          this.teacher()
  }

teacher(){
  this.ds.tData(this.id).subscribe({
    next:(result:any)=>{
      this.teacherdata=result.user      
    }
  })
}


  update(){
var name=this.teacherdata.name
var subject=this.teacherdata.subject
var id=this.id
    const body={name,subject,id}

  this.ds.editteacher(body).subscribe({
    next:(result:any)=>{
      Swal.fire({
        icon:'success',
        title:result.message
      })
      
    },
    error:(result:any)=>{
      Swal.fire({
        icon:'error',
        title:result.error.message
      })
    }
  })

  
  }
  change(){

    var id=this.id
    var oldpsw=this.teacherForm.value.oldpsw
     var opsw=this.teacherdata.tpsw
    var tpsw=this.teacherForm.value.psw
    var cpsw=this.teacherForm.value.cpsw
 const body={id,tpsw}
    if(cpsw===tpsw){
      if(oldpsw==opsw){
        if(tpsw==opsw){
          Swal.fire({
            icon:'error',
            text:"Same As Old Password"
          })
        }
        else{
          this.ds.tpswupdate(body).subscribe({
            next:(result:any)=>{
              localStorage.removeItem("id")
              this.route.navigateByUrl("teacher-login")
              Swal.fire({
                icon:"success",
                title:result.message
              })
            }
          })
            
        }


      }
      else{
        Swal.fire({
          icon:'error',
          text:"not valid"
        })
      }
  

    }
    else{
      this.pswCheck=true
    }

  }

}
