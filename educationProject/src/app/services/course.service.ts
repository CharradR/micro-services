import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Course {
  id: number;
  title: string;
  description: string;
  teacherId?: number;
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  
  backCourseUrl: string ="http://localhost:8091/api/course";

  constructor(private httpClient: HttpClient) {}

    addCourse(course:any){
      return this.httpClient.post(this.backCourseUrl,course);
    }
  
  getAllCourses(){
    return this.httpClient.get(this.backCourseUrl)};

  getCourseById( id : number){
    return this.httpClient.get(`${this.backCourseUrl}/${id}`);
  }


  updateCourse(newCourse : any){
    return this.httpClient.post(`${this.backCourseUrl}/${newCourse.id}`, newCourse)
  }

  deleteCourse(id: any){
    return this.httpClient.delete(`${this.backCourseUrl}/${id}`);
  }

  searchCourse(course: any){
    return this.httpClient.post(this.backCourseUrl, course);
  }


}
