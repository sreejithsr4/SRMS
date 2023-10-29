import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  providers: [DatePipe]
})
export class TeacherComponent implements OnInit{
  searchId:any=""
  id:any=""
  tid:any=""
  evaluated:any=""
  editactive:any=false
  subdata:any=""
  teacherdata:any=""
  mydate:any= new Date()
  score=this.fb.group({
    sid:['',[Validators.required,Validators.pattern('[0-9]+')]],
    score:['',[Validators.required,Validators.pattern('[0-9]+')]],
    test:['',[Validators.required,Validators.pattern('[A-Za-z0-9 ]+')]],
    fullscore:['',[Validators.required,Validators.pattern('[0-9]+')]],
    code:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })
  test:any=""
  testData:any=[]
  constructor(private ds:DataService,private route:Router,
    private fb:FormBuilder,private ar:ActivatedRoute,private date:DatePipe){
      this.mydate = this.date.transform(this.mydate, 'short');
    }
  active:any=false
  ngOnInit(): void {
    this.searchId=""
    if(!localStorage.getItem("id")){
      this.route.navigateByUrl("")
    }
    else{
      this.id=localStorage.getItem("id")
    }
    this.ar.params.subscribe(data=>{
      this.tid=data["tid"]      
    })



this.teacher()
this.getMarks()
this.gettest()


      this.editactive=false
    this.active=false

    this.ds.viewsubject().subscribe({
      next:(result:any)=>{
        this.subdata=result.message
      }
    })

  }
teacher(){
  this.ds.tData(this.id).subscribe({
    next:(result:any)=>{
      this.teacherdata=result.user
      console.log(this.teacherdata);
      
    }
  })
}
gettest(){
  this.ds.gettest().subscribe({
    next:(result:any)=>{
      this.testData=result.message

    }
  })
}




  addmark(){
    this.active=true
    this.editactive=false
  }
  addScore(){
 var tid=this.tid
 var sid=this.score.value.sid
 var mark=this.score.value.score
 var test=this.score.value.test
 var fullmark=this.score.value.fullscore
 var subcode=this.score.value.code
 var subject=this.subdata.filter((i:any)=>i.code==subcode)[0].name
 
 var date=this.mydate
 
 const body={tid,sid,mark,subcode,test,date,fullmark,subject}

if(this.score.valid){
  this.ds.addmark(body).subscribe({
    next:(result:any)=>{
      this.score.reset()
      Swal.fire({
        icon:'success',
        title:result.message,
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
  Swal.fire({
    icon:'warning',
    title:'Enter Valid Details'
  })
}




  }
  logout(){
    localStorage.removeItem("id")
    this.route.navigateByUrl("")
  }

getMarks(){
  this.ds.getonemark(this.tid).subscribe({
    next:(result:any)=>{
      this.evaluated=result.message
      
    }
  })
}

  editMark(){
    this.active=false
    this.editactive=true
this.getMarks()


  }
  edit(id:any){
    this.route.navigateByUrl(`edit-mark/${id}`)
  }
  editinfo(){
    this.route.navigateByUrl("edit-teacher")
  }
  delete(id:any){
    this.ds.deletemark(id).subscribe({
      next:(result:any)=>{
        Swal.fire({
          icon:'success',
          title:result.message
        })
      }
    })

  }
  searchsid(event:any){
    this.searchId=event.target.value
    
  }
}
