import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dataArray:any[],searchString:boolean,DataKey:string): any {
  const result:any=[]
  if(!dataArray ||searchString==null || DataKey ==""){
    return dataArray
  }
  else{
    dataArray.forEach((item:any)=>{
      if(item[DataKey]==searchString)
      {
        result.push(item)
      }
      })
    } 
    return result

  }


}


