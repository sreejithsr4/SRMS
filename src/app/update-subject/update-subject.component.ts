import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css'],
  providers: [DatePipe]
})
export class UpdateSubjectComponent implements OnInit{
  id:any=""
  subjectdata:any=""

  constructor(private ds:DataService,private fb:FormBuilder,private ar:ActivatedRoute,private route:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    this.ar.params.subscribe(data=>{
      this.id=data["id"]
     console.log(this.id);
     
      
    })
    this.ds.getonesubject(this.id).subscribe({
      next:(result:any)=>{
       this.subjectdata=result.message
      }
    })
  }
  update(){
    var name=this.subjectdata.name
    var code=this.subjectdata.code
    var id =this.id
    const body={name,code,id}
this.ds.updatesubject(body).subscribe({
  next:(result:any)=>{
    Swal.fire({
      icon:'success',
      title:result.message
    })
    this.route.navigateByUrl("view-subject")
  },
  error:(result:any)=>{
    Swal.fire({
      icon:'error',
      title:result.error.message
    })
  }
})
  }

}
