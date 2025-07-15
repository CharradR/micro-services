import { Component } from '@angular/core';
import { Book, BookService } from 'src/app/services/book.service';
import { Loan, LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
 editIndex: number | null = null;

  books: Book[] = [];
  loans: Loan[] = [];
  constructor(private loanService: LoanService, private bookService : BookService) { }
  isFormVisible = false;
  isEditing = false;
  searchEmail = '';

  ngOnInit(): void {
      this.loadLoansWithBookDetails();
  }
    loadLoansWithBookDetails() {
    this.loanService.getLoans().subscribe({
      next: (loans) => {
        this.loans = loans;

        // Pour chaque prêt, récupérer les détails du livre
        this.loans.forEach(loan => {
          this.bookService.getBookById(loan.bookId).subscribe({
            next: book => {
              loan.bookDetails = book;
            },
            error: err => {
              console.error(`Failed to load book details for bookId=${loan.bookId}`, err);
              loan.bookDetails = undefined;
            }
          });
        });
      },
      error: err => {
        console.error('Error fetching loans:', err);
      }
    });
  }
  get filteredLoans(): Loan[] {
    if (!this.searchEmail) {
      return this.loans;
    }
    const query = this.searchEmail.trim().toLowerCase();
    return this.loans.filter(loan =>
      loan.userEmail && loan.userEmail.toLowerCase().includes(query)
    );

  }
}
