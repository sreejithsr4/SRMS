import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  searchData:any=true
  testdata:any=""
  constructor(private ds:DataService){
    this.ds.header()
  }
  ngOnInit(): void {
  
   
    this.ds.gettest().subscribe({
      next:(result:any)=>{
        this.testdata=result.message         
      }
    })
    
  }

}
