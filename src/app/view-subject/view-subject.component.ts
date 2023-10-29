import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.css']
})
export class ViewSubjectComponent implements OnInit{
  subjectdata:any=[]
  constructor(private ds:DataService,private route:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
this.subdata()
  }

subdata(){
  this.ds.viewsubject().subscribe({
    next:(result:any)=>{
      this.subjectdata=result.message
    }
  })
}

  edit(id:any){
this.route.navigateByUrl(`update-subject/${id}`)
  }
  delete(id:any){
this.ds.deletesubject(id).subscribe({
  next:(result:any)=>{
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
        this.ds.deletesubject(id).subscribe({
          next:(result:any)=>{
            this.subdata()
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }

        })
  
      }
    })
  }
})
  }

}
