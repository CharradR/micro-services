import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
    private apiUrl = 'http://localhost:8081/api/loans';
  
    constructor(private http: HttpClient) {}

}
