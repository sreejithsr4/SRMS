import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-check-result',
  templateUrl: './check-result.component.html',
  styleUrls: ['./check-result.component.css']
})
export class CheckResultComponent implements OnInit{
  sdata:any=""
  active:any=false
  totalMarks:any=""
  studentResult:any=""
  resultData:any=[]
  testName:any=""
  studentId=this.fb.group({
    sid:['',[Validators.required,Validators.pattern('[0-9 ]+')]]

  })
  constructor(private ar:ActivatedRoute,private ds:DataService,private fb:FormBuilder,private route:Router){}
  ngOnInit(): void {
    this.ar.params.subscribe(
      data=>{
        this.testName=data["test"]

      }
    )
    this.active=false
   
  }
  getResult(){
    var sid=this.studentId.value.sid
    var test=this.testName
  
    if(this.studentId.valid){
      this.ds.getMark(test).subscribe({
      
        next:(result:any)=>{
          this.resultData=result.message
          if(this.resultData.length==0){
            Swal.fire({
              icon:'error',
              title:"Student Not Found"
            })
  
          }
          else{
            this.studentResult=this.resultData.filter((i:any)=>i.sid==sid)
            if(this.studentResult.length==0){
              Swal.fire({
                icon:'error',
                title:"Student Not Found"
              })
            }
            else{
              this.totalMarks=this.studentResult.map((i:any)=>i.mark).reduce((a:any,b:any)=>a+b)
              this.ds.sidData(sid).subscribe({
                next:(result:any)=>{
                  this.sdata=result.message
  
                }
              })
              this.active=true
            }
         
          }
       
  
        },
        error:(result:any)=>{
  alert(result.error.message)
        }
      })
    }
    else{
      Swal.fire({
        icon:'error',
        title:"Enter Valid Id"
      })
    }
  
    
 
 


  }
  pdfDownload(){
    var pdf=new jsPDF()

    autoTable(pdf,{ html: '#my-table' })
    pdf.output("dataurlnewwindow")
    // save pdf
    pdf.save("Exam Results.pdf")

  }
  home(){
    this.route.navigateByUrl("")
  }

}
