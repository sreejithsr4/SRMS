import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
  providers: [DatePipe]
})
export class AddSubjectComponent implements OnInit{
  subject=this.fb.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    code:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })
  myDate: any = new Date();
  
  constructor(private fb:FormBuilder,private ds:DataService,private date:DatePipe,private route:Router){
    this.myDate = this.date.transform(this.myDate, 'short');
    
  }
ngOnInit(): void {
  if(!localStorage.getItem("id")){
      
    this.route.navigateByUrl("")
  }
}
addsub(){
  var name=this.subject.value.name
  var code=this.subject.value.code
  var date=this.myDate
  const body={name,code,date}
  if(this.subject.valid){
    this.ds.addsubject(body).subscribe({
      next:(result:any)=>{
        this.subject.reset()
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
  else{
    Swal.fire({
      icon:'error',
      title:"Enter valid Details"
    })
  }

}
}
