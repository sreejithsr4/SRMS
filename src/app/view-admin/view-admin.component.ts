import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit{
  adminData:any=[]
  id:any=""
  adminForm=this.fb.group({
    opsw:[''],
    psw:[''],
    cpsw:['']
  })
  constructor(private ds:DataService,private fb:FormBuilder,private route:Router){}
  ngOnInit(): void {
    if(localStorage.getItem("id")){
      this.id=localStorage.getItem("id")
      
      this.ds.getadmin(this.id).subscribe({
        next:(result:any)=>{
          this.adminData=result.message
          console.log(this.adminData.psw);
          console.log();
          
          
        }
      })
    }
    else{
this.route.navigateByUrl("")
    }
  }
  update(){
    var opsw=this.adminForm.value.opsw
    var psw=this.adminForm.value.psw
    var cpsw=this.adminForm.value.cpsw
    var uname=this.adminData.uname
    if(opsw==this.adminData.psw){
      if(psw==cpsw){
        if(opsw==psw){
          Swal.fire({
            icon:'warning',
            text:"Old and New Password are same"
          })

        }
        else{
          const body={psw,uname}
          this.ds.updateAdmin(body).subscribe({
            next:(result:any)=>{
              Swal.fire({
                icon:'success',
                text:result.message
              })
            }
          })
        }
  
      }
      else{
        Swal.fire({
          icon:'warning',
          text:"Password Doesnt match"
        })
      }
    }
    else{
      Swal.fire({
        icon:'error',
        text:"Password Incorrect"

      })
    }
    }


}
