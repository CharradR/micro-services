import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendaceService {

  constructor(private http : HttpClient) { }


  PostStudentsAttendanceBelongingToClass(studentId : number,attendace :any){
    return this.http.post<any>(`http://localhost:8081/attendance/add/student/${studentId}`,attendace)
  }

  getAttendanceByDateAndGroup(groupId: number, date: any) {
    const params = { date };
    return this.http.get<any[]>(`http://localhost:8081/attendance/date/${groupId}`, { params });
  }


 findAllAttendancesByGroupId(id:number){
    return this.http.get<any[]>(`http://localhost:8081/attendance/groups/${id}`)
 }


 rateAbsenceByStudentId(studentId:number){
   return this.http.get(`http://localhost:8081/attendance/rate/${studentId}`)
 }
}
