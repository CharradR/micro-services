import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  // definir l'url du serveur BE 
  backCourseUrl: string ="http://localhost:8091/api/course";
  // backCourseUrl = "api/course";

  constructor(private httpClient: HttpClient) {}

    //Response: course object with ID
    addCourse(course:any){
      return this.httpClient.post(this.backCourseUrl,course);
    }
  

  //Response : Array of objects 
  getAllCourses(){
    return this.httpClient.get(this.backCourseUrl)};

  //Response : object Course with ID
  getCourseById( id : number){
    return this.httpClient.get(`${this.backCourseUrl}/${id}`);
  }


  updateCourse(newCourse : any){
    return this.httpClient.post(`${this.backCourseUrl}/${newCourse.id}`, newCourse)
  }

  // Response : Boolean
  deleteCourse(id: any){
    return this.httpClient.delete(`${this.backCourseUrl}/${id}`);
  }

    // Search By ScoreOne and ScoreTwo
  // Response : Array of Objets
  searchCourse(course){
    return this.httpClient.post(this.backCourseUrl, course);
  }


}
