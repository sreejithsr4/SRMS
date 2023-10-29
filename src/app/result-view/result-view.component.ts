import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit{
  testdata:any=""
  constructor(private ds:DataService){}
  ngOnInit(): void {
       
    this.ds.gettest().subscribe({
      next:(result:any)=>{
        this.testdata=result.message
        
      }
    })
    
  }

}
