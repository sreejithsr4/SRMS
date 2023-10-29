import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edi-mark',
  templateUrl: './edi-mark.component.html',
  styleUrls: ['./edi-mark.component.css']
})
export class EdiMarkComponent implements OnInit{
  score=this.fb.group({
    score:['',[Validators.required,Validators.pattern('[0-9]+')]],
    fullscore:['',[Validators.required,Validators.pattern('[0-9]+')]]

  })
  id:any=""
  constructor (private ds:DataService,private fb:FormBuilder,private ar:ActivatedRoute,private route:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem("id")){
      
      this.route.navigateByUrl("")
    }
    this.ar.params.subscribe(data=>{
      this.id=data["id"]
      
    })
  }
updateScore(){
  var mark=this.score.value.score
  var fullmark=this.score.value.fullscore
  var id=this.id
  const body= {id,mark,fullmark}
  if(this.score.valid){
    this.ds.updatemark(body).subscribe({
      next:(result:any)=>{
        Swal.fire({
          icon:'success',
          title:result.message
        })
  
        this.score.reset()
      }
    })
  }
  else{
    Swal.fire({
      icon:'error',
      title:"Enter Valid details"
    })
  }



}
}
