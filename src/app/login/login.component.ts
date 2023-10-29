import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  adminLoginForm=this.fb.group({
    uname:[''],
    psw:['']
   }) 
  constructor(private route:Router,private fb:FormBuilder,private ds:DataService){}
ngOnInit(): void {
 
}
login(){
  if(this.adminLoginForm.valid){
   var uname=this.adminLoginForm.value.uname
   var psw =this.adminLoginForm.value.psw
   
this.ds.alogin(uname,psw).subscribe({
  next:(result:any)=>{
 
  localStorage.setItem("id",result.id)
  localStorage.setItem("token",JSON.stringify(result.token))

  console.log(result.id);
  Swal.fire({
    icon:'success',
    text:result.message
  })
  this.ds.header()
  this.route.navigateByUrl("admin")
  },
  error:(result:any)=>{
    Swal.fire({
      icon: 'error',
      text: result.error.message,
    })
  }
})

  }
  else{
    alert("Incorrect details")
  }
 
}
}
