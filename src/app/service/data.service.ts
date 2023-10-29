import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{
  links=new BehaviorSubject(true)

  constructor(private http:HttpClient) { 
    this.header()
   }
  ngOnInit(): void {
    
  }

  getToken(){
    //create header object
    const headers = new HttpHeaders()
    if(localStorage.getItem("token")){
      const token = JSON.parse(localStorage.getItem("token") || "")
      options.headers=headers.append("access_token",token)
    }
  
    return options
  }



  header(){
    if(localStorage.getItem("id")){
      this.links.next(false)
    }
    else{
      this.links.next(true)
    }
  }

baseurl:any="https://srmsserver.onrender.com"
alogin(uname:any,psw:any){
 const bodydata={uname,psw}
 return this.http.post(`${this.baseurl}/school/admin/login`,bodydata)
}
sregister(sid:any,name:any,age:any,cl:any,email:any,pno:any,psw:any,date:any){
  const bodydata={sid,name,age,cl,email,pno,psw,date}
  return this.http.post(`${this.baseurl}/school/student/account_create`,bodydata)
}
tregister(tid:any,name:any,subject:any,tpsw:any,date:any){
  const bodydata={tid,name,subject,tpsw,date}
  return this.http.post(`${this.baseurl}/school/teacher/account_create`,bodydata)
}
login(sid:any,psw:any){
  const bodydata={sid,psw}
  return this.http.post(`${this.baseurl}/school/student/login`,bodydata)
 }
 studentData(){
  return this.http.get(`${this.baseurl}/school/admin/students`)
 }
 activate(tid:any){
const bodydata={tid}
return this.http.post(`${this.baseurl}/school/admin/teacher/activate`,bodydata)
 }
 tlogin(tid:any,tpsw:any){
  const body ={tid,tpsw}
  return this.http.post(`${this.baseurl}/school/teacher/login`,body)
 }
 teacherData(){
  return this.http.get(`${this.baseurl}/school/admin/teachers`)
 }
 editteacher(body:any){
return this.http.put(`${this.baseurl}/school/admin/teachers-edit`,body)
 }
 tData(id:any){
  return this.http.get(`${this.baseurl}/school/admin/teacher-data/${id}`)
 }
 deleteteacher(tid:any){
  return this.http.delete(`${this.baseurl}/school/admin/delete-teacher/${tid}`)
 }
 addtest(date:any,name:any,des:any){
  const body ={date,name,des}
  return this.http.post(`${this.baseurl}/school/admin/add-test`,body,this.getToken())
 }
 gettest(){
  return this.http.get(`${this.baseurl}/school/teacher/get-test`)
 }
 addmark(body:any){
  return this.http.post(`${this.baseurl}/school/admin/mark-add`,body)
 }
 supdate(sid:any){
  const body={sid}
  return this.http.post(`${this.baseurl}/school/admin/student/activate`,body)

 }

 addsubject(body:any){
return this.http.post(`${this.baseurl}/school/admin/add-subject`,body,this.getToken())
 }
 viewsubject(){
  return this.http.get(`${this.baseurl}/school/admin/get-subject`)
 }
 getonesubject(id:any){
  return this.http.get(`${this.baseurl}/school/admin/getone-subject/${id}`)
 }
 updatesubject(body:any){
return this.http.post(`${this.baseurl}/school/admin/update-subject`,body,this.getToken())
 }
 addclass(body:any){
  return this.http.post(`${this.baseurl}/school/admin/add-class`,body,this.getToken())
 }
 classdata(){
  return this.http.get(`${this.baseurl}/school/admin/classdata`)
 }
 classdelete(id:any){
  return this.http.delete(`${this.baseurl}/school/admin/class/delete/${id}`,this.getToken())
 }
 getMark(test:any){

  return this.http.get(`${this.baseurl}/school/result/get/${test}`)
  
 }
 deleteTest(name:any){
  return this.http.delete(`${this.baseurl}/school/admin/test/delete/${name}`,this.getToken())
 }
 testStatus(body:any){
  return this.http.post(`${this.baseurl}/school/admin/test/status`,body,this.getToken())
 }
 deleteStudent(sid:any){
  return this.http.delete(`${this.baseurl}/school/admin/student/delete/${sid}`,this.getToken())
 }
 getadmin(id:any){
  return this.http.get(`${this.baseurl}/school/admin/data/${id}`)
 }
 updateAdmin(body:any){
  return this.http.put(`${this.baseurl}/school/admin/update`,body)
 }
 getonemark(tid:any){
  return this.http.get(`${this.baseurl}/school/teacher/get-mark/${tid}`)
 }
 updatemark(body:any){
  return this.http.post(`${this.baseurl}/school/teacher/update-mark`,body)
 }
 getonetest(id:any){
  return this.http.get(`${this.baseurl}/school/admin/test/get/${id}`)
 }
 edittest(body:any){
  return this.http.post(`${this.baseurl}/school/admin/edit-test`,body,this.getToken())
 }
 studentonedata(id:any){
  return this.http.get(`${this.baseurl}/school/student/data/${id}`)
 }
 editstudent(body:any){
  return this.http.post(`${this.baseurl}/school/student/update`,body)
 }
 spswupdate(body:any){
  return this.http.post(`${this.baseurl}/school/student/psw/update`,body)
 }
 tpswupdate(body:any){
  return this.http.post(`${this.baseurl}/school/teacher/psw/update`,body)
 }
 deletemark(id:any){
  return this.http.delete(`${this.baseurl}/school/teacher/mark/delete/${id}`,this.getToken())
 }
 deletesubject(id:any){
  return this.http.delete(`${this.baseurl}/school/admin/subject/delete/${id}`,this.getToken())
 }
 sidData(sid:any){
  return this.http.get(`${this.baseurl}/school/mark/${sid}`)
 }
}
