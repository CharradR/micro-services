import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
export interface Loan {
  id: string;
  bookId: string;
  userEmail: string;
  loanDate: string;
  dueDate: string;
  returned: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class LoanService {
  private apiUrl = 'http://localhost:8081/api/loans';

  constructor(private http: HttpClient) { }

  borrowBook(bookId: string, userEmail: string): Observable<any> {
    const body = { bookId, userEmail };
    return this.http.post(this.apiUrl, body);
  }

}
