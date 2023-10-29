import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.css']
})
export class ManageTeacherComponent implements OnInit{
  searchId:any=""
  searchData:any=null
  teacherdata:any=[]
  change:any=false
  dele:any=false
  constructor(private route:Router,private ds:DataService){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    this.searchId=""
    this.searchData=null
this.teacher()
  }


  //status update
  update(tid:any){
    this.ds.activate(tid).subscribe({
      next:(result:any)=>{
        Swal.fire({
          icon:'success',
          title:result.message
        })
this.teacher()
      },
      error:(result:any)=>{
        Swal.fire({
          icon:'info',
          title:result.error.message
        })
   
      }
    })

  }
  // teacher data collection
  teacher(){
    this.ds.teacherData().subscribe({
next:(result:any)=>{

  this.teacherdata=result.user
  

},
error:(result:any)=>{
  alert(result.error.message)
}
    })
  }
  // teacher edit
  edit(tid:any){
    this.route.navigateByUrl(`edit-teacher/${tid}`)
  }
  // teacher delete
 delete(tid:any){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.ds.deleteteacher(tid).subscribe({
        next:(result:any)=>{
          this.ds.teacherData().subscribe({
            next:(result:any)=>{
              this.teacherdata=result.user
              
             this.dele=true
            },
            error:(result:any)=>{
              alert(result.error.message)
            }
                })
       
        }
      })
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })



}
notactive(){
  this.searchData=false
}
all(){
  this.searchData=null
}
active(){
  this.searchData=true
}
searchid(event:any){
  this.searchId=event.target.value

}


}
