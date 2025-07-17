import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://gateway:8083';
  constructor(private http : HttpClient) { }


  getStudentsBelongingToClass(groupId : number){
    return this.http.get(`${this.baseUrl}/student/all/${groupId}`)
  }


  removeStudent(studentId :number){
   return  this.http.delete(`${this.baseUrl}/student/remove/${studentId}`)
  }
  addStudennt(student:any){
    return this.http.post(`${this.baseUrl}/student`,student)
  }


}
