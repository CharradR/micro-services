import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }


  getStudentsBelongingToClass(groupId : number){
    return this.http.get(`http://localhost:8080/student/all/${groupId}`)
  }


  removeStudent(studentId :number){
   return  this.http.delete(`http://localhost:8080/student/remove/${studentId}`)
  }
  addStudennt(student:any){
    return this.http.post("http://localhost:8080/student",student)
  }


}
