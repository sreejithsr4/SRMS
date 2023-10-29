import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit{

  searchId:any=""
  searchData:any=null
  sactive:any=false
  studentData:any=[]


  constructor(private ds:DataService,private route:Router){

  }
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    this.searchId=""
    console.log(this.searchId);
    
    this.searchData=null
    this.student()
  }
  student(){
    this.ds.studentData().subscribe({
      next:(result:any)=>{
        this.studentData=result.user
        this.sactive=true
        
      },
      error:(result:any)=>{
        alert(result.error.messsage)
      }
    })
  }
  supdate(sid:any){
    this.ds.supdate(sid).subscribe({
     
        next:(result:any)=>{
          Swal.fire({
            icon:'success',
            title:result.message
          })
          this.student()

        },
        error:(result:any)=>{
          Swal.fire({
            icon:'warning',
            title:result.error.message
          })
        }
      })
   
  }
delete( sid:any){
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
      this.ds.deleteStudent(sid).subscribe({
        next:(result:any)=>{
      
          this.student()
        },
        error:(result:any)=>{
          alert(result.error.message)
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
