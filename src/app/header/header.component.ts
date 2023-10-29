import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  data:any=""
  constructor(private route:Router,private ds:DataService){
   
    this.ds.header()
  }
  ngOnInit(): void {
    this.ds.links.subscribe((login:any)=>{
      this.data=login
    })
  }


}
