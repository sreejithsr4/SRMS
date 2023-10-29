import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit{
  classData:any=""
  constructor(private ds:DataService,private route:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    
    this.dataclass()
  }
  //class data collection
  dataclass(){
    this.ds.classdata().subscribe({
      next:(result:any)=>{
        this.classData=result.message
  
        
      }
    })
  }
  //removing class
  remove(id:any){
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
        this.ds.classdelete(id).subscribe({
          next:(result:any)=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.dataclass()
          }
        })
    

      }
    })

  }

}
