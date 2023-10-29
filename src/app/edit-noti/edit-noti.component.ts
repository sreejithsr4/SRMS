import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-noti',
  templateUrl: './edit-noti.component.html',
  styleUrls: ['./edit-noti.component.css']
})
export class EditNotiComponent implements OnInit{
  id:any=""
  testData:any=""
  notification:any=[]
  constructor(private ds:DataService,private ar:ActivatedRoute,private route:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
  this.ar.params.subscribe(data=>{
    this.id=data["id"]
    
    
  })  
    this.ds.getonetest(this.id).subscribe({
      next:(result:any)=>{
        this.testData=result.message        
      }
  
    })
  }
update(){
  var id=this.id
  var name=this.testData.name
  var des=this.testData.des
  const body={id,name,des}
  this.ds.edittest(body).subscribe({
    next:(result:any)=>{
  Swal.fire({
        icon:'success',
        title:result.message
      })
    }
  })

}

}
