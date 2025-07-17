import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:8083/microservice-students';
  constructor(private http:HttpClient) { }

  findAllClasses(){
    return this.http.get(`${this.baseUrl}/group/all`)
  }
  addGroup(group:any){
    return this.http.post(`${this.baseUrl}/group`,group)
  }


}
