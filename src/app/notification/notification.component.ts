import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [DatePipe]
})
export class NotificationComponent implements OnInit{
  mydate:any=new Date()
  notification=this.fb.group({
name:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 .,]+')]],
des:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 .,]+')]]
  })
  constructor(private ds:DataService,private fb:FormBuilder,private route:Router,private date:DatePipe){
    this.mydate=this.date.transform(this.mydate,'short')

  }
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    
  }
addNoti(){
  if(localStorage.getItem("id")){
    var name=this.notification.value.name
    var des=this.notification.value.des
    var date=this.mydate
    if(this.notification.valid){
      this.ds.addtest(date,name,des).subscribe({
        next:(result:any)=>{
         Swal.fire({
          icon:'success',
          title:'Yes!!',
          text:result.message
         })
         this.notification.reset()
        },
        error:(result:any)=>{
          Swal.fire({
            icon:'error',
            title:result.error.message
          })
        }
      })
    }
    else{
      Swal.fire({
        icon:'warning',
        title:"Enter Valid details"
      })
    }

  }
}
}
