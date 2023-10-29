import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit{
  testData:any=""
  constructor(private ds:DataService,private route:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    this.test()
    
  }
  test(){
    this.ds.gettest().subscribe({
      next:(result:any)=>{
        this.testData=result.message
        
        
      }

    })
  }
  edit(id:any){
this.route.navigateByUrl(`edit-test/${id}`)
  }
  delete(name:any){
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
    this.ds.deleteTest(name).subscribe({
      next:(result:any)=>{
        this.test()
      }
    })
    Swal.fire(
      'Deleted!',
      'Test has been deleted.',
      'success'
    )
  }
    })
}
  publish(id:any){
    const body= {id}
    this.ds.testStatus(body).subscribe({
      next:(result:any)=>{
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

}
