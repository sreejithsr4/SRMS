import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
  providers: [DatePipe]

})
export class AddClassComponent implements OnInit{
  addclass=this.fb.group({
    name:['',[Validators.required,Validators.pattern('[A-Z0-9 ]+')]],
    numerical:['',[Validators.required,Validators.pattern('[0-9 ]')]],
    division:['',[Validators.required,Validators.pattern('[A-Z ]')]]
  })

  myDate:any=new Date()
  constructor(private ds:DataService,private route:Router,private fb:FormBuilder,private date:DatePipe){
    this.myDate = this.date.transform(this.myDate, 'short');

  }
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    
  }


  addOneClass() {
    var name=this.addclass.value.name
    var numerical=this.addclass.value.numerical
    var division=this.addclass.value.division
    var date=this.myDate
    const body={name,numerical,division,date}

if(this.addclass.valid){
  this.ds.addclass(body).subscribe({
    next:(result:any)=>{
      Swal.fire({
        icon:'success',
        title:result.message
      })
      this.addclass.reset()
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
    title:"Enter Valid Inputs"
  })
}




}
}
