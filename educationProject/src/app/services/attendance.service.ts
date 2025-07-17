import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttendaceService {
  private baseUrl = 'http://localhost:8083/attendance';
  constructor(private http : HttpClient) { }


  PostStudentsAttendanceBelongingToClass(studentId : number,attendace :any){
    return this.http.post<any>(`${this.baseUrl}/attendance/add/student/${studentId}`,attendace)
  }

  getAttendanceByDateAndGroup(groupId: number, date: any) {
    const params = { date };
    return this.http.get<any[]>(`${this.baseUrl}/attendance/date/${groupId}`, { params });
  }


 findAllAttendancesByGroupId(id:number){
    return this.http.get<any[]>(`${this.baseUrl}/attendance/groups/${id}`)
 }


 rateAbsenceByStudentId(studentId:number){
   return this.http.get(`${this.baseUrl}/attendance/rate/${studentId}`)
 }
}
