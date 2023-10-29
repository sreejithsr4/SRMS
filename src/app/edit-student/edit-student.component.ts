import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit{
  id:any=""
  pswCheck:any=false
  studentData:any=""
  classdata:any=""

  students=this.fb.group({
    cl:['',[Validators.required,Validators.pattern('[0-9a-zA-Z ]{1,5}')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]],
    cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]],
    oldpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]]

  })
  constructor(private ds:DataService,private fb:FormBuilder,private route:Router){}
  ngOnInit(): void {
    if(localStorage.getItem("id")){
      this.id=localStorage.getItem("id")
    }
    else{
      this.route.navigateByUrl("")
    }
    this.ds.classdata().subscribe({
      next:(result:any)=>{
        this.classdata=result.message
      }
    })
    this.pswCheck=false
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
    var id=this.id
 
    var age=this.studentData.age
    var pno=this.studentData.pno
    var name=this.studentData.name
    var email=this.studentData.email
    var cl=this.students.value.cl
 
    const body= {id,age,pno,name,email,cl}
    if(cl){
      this.ds.editstudent(body).subscribe({
        next:(result:any)=>{
          Swal.fire({
            icon:'success',
            title:result.message
          })
          this.student()
          this.route.navigateByUrl("student")
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
  change(){
    var id=this.id
    var oldpsw=this.students.value.oldpsw
    var opsw=this.studentData.psw
    var psw=this.students.value.psw
    var cpsw=this.students.value.cpsw
 const body={id,psw}
    if(cpsw==psw){
      if(oldpsw==opsw){
        if(psw==opsw){
          Swal.fire({
            icon:'warning',
            title:"Password Same As Old Password"
          })
 

        }
        else{
          this.ds.spswupdate(body).subscribe({
            next:(result:any)=>{
              Swal.fire({
                icon:'success',
                title:result.message
              })
              this.student()
              this.route.navigateByUrl("student-login")
              localStorage.removeItem("id")

            }
          })
        }


      }
      else{
        Swal.fire({
          icon:'warning',
          title:"Wrong Current Password"
        })
      }
  

    }
    else{
      this.pswCheck=true
    }
  }


}
