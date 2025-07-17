import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http:HttpClient) { }

  findAllClasses(){
    return this.http.get("http://localhost:8080/group/all")
  }
  addGroup(group:any){
    return this.http.post("http://localhost:8080/group",group)
  }


}
