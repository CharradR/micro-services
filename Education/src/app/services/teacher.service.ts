import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  // definir l'url du serveur BE 
  backteacherUrl: string ="http://localhost:8091/api/teacher";
  // backCourseUrl = "api/course";

  constructor(private httpClient: HttpClient) { }

  // Response (teacher object with Id)
  addteacher(teacher: any){
    return this.httpClient.post(this.backteacherUrl, teacher);
  }
  
  // Response (Array of object)
  getAllteachers(){
    return this.httpClient.get(this.backteacherUrl);
  }

  // Response : teacher Object
  getteacherById(id: number){
    // concatination
    // return this.httpClient.get(this.backteacherUrl + "/" + id);
    return this.httpClient.get(`${this.backteacherUrl}/${id}`);
  }

  // Response : teacher Object
  updateteacher(newteacher: any){
    return this.httpClient.put(`${this.backteacherUrl}`, newteacher);
  }
  
  deleteteacher(id: any){
    // Response : Boolean
    return this.httpClient.delete(`${this.backteacherUrl}/${id}`);
  }

  // Search By ScoreOne and ScoreTwo
  // Response : Array of Objets
  searchteacher(teacher){
    return this.httpClient.post(this.backteacherUrl, teacher);
  }
}
