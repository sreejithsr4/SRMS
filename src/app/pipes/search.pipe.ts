import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  transform(dataArray:any[],searchString:Number,DataKey:string): any {
    const result:any=[]
    if(!dataArray ||searchString.toString().length==0 || DataKey ==""){
      return dataArray
    }
    else{
      dataArray.forEach((item:any)=>{
        if(item[DataKey].toString().includes(searchString))
        {
          result.push(item)
        }
        })
      } 
      return result
  
    }
}
