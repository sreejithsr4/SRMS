import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe]

})
export class RegisterComponent implements OnInit{
  classdata:any=[]

  mydate:any=new Date()
  pswCheck:any=false
sRegister=this.fb.group({
  id:['',[Validators.required,Validators.pattern('[0-9]+')]],
  name:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
  age:['',[Validators.required,Validators.pattern('[0-9]+')]],
  pno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  eid:['',[Validators.required,Validators.pattern('[0-9a-zA-Z@.]+')]],
  cl:['',[Validators.required,Validators.pattern('[0-9]{2-5}')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @. ]+')]],
  cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z @.]+')]]
})


  constructor(private fb:FormBuilder,private ds:DataService,private route:Router,private date:DatePipe){
this.mydate=this.date.transform(this.mydate,'short')
  }
  ngOnInit(): void {
    this.ds.classdata().subscribe({
      next:(result:any)=>{
        this.classdata=result.message
      }
    })
  }
  signup(){
    var path=this.sRegister.value
    var sid=path.id
    var name=path.name
    var age=path.age
    var cl=path.cl
    var pno=path.pno
    var psw=path.psw
    var email=path.eid
    var cpsw=path.cpsw
   var date=this.mydate
    


    if(psw==cpsw){
      this.pswCheck=false
      this.ds.sregister(sid,name,age,cl,email,pno,psw,date).subscribe({
        next:(result:any)=>{
          this.route.navigateByUrl("")
          Swal.fire({
            icon:'success',
            text:result.message
          })
          
        },
        error:(result:any)=>{
          Swal.fire({
            icon:'error',
            text:result.error.message
          })
                  }
      })



    }
    else{
      this.pswCheck=true
    }


  
    
  }

}
