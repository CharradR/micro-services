import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Book } from './book.service';
export interface Loan {
  id?: string;
  bookId: string;
  userEmail: string;
  loanDate: string;
  dueDate: string;
  returned: boolean;
  bookDetails: Book | undefined;
}

@Injectable({
  providedIn: 'root'
})

export class LoanService {
  private apiUrl = 'http://localhost:8081/api/loans';

  constructor(private http: HttpClient) { }
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }
  borrowBook(bookId: string, email: string): Observable<any> {
    const body = { bookId, email };
    return this.http.post(this.apiUrl, body);
  }
  returnBook(loanId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${loanId}/return`, null);
  }

  deleteLoan(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
