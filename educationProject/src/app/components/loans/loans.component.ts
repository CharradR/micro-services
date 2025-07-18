import { Component } from '@angular/core';
import { Book, BookService } from 'src/app/services/book.service';
import { Loan, LoanService } from 'src/app/services/loan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
  editIndex: number | null = null;

  books: Book[] = [];
  loans: Loan[] = [];
  constructor(private loanService: LoanService, private bookService: BookService) { }
  isFormVisible = false;
  isEditing = false;
  searchEmail = '';
  dueDate: string = '';
  isDueExpired: boolean = false;



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

  isLoanExpired(dueDate: string): boolean {
    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    return due < today;
  }
sendAvertissement(loanId: string) {
  this.loanService.sendAvertissement(loanId).subscribe({
    next: (res: any) => {
      Swal.fire('Succès', res.message, 'success');
    },
    error: err => {
      const message = err.error?.error || 'Erreur lors de l’envoi de l’avertissement.';
      Swal.fire('Erreur', message, 'error');
    }
  });
}



  deleteLoan(loan: Loan): void {
    if (!loan.id) return;

    if (!loan.returned) {
      Swal.fire({
        title: 'Cannot delete this loan',
        text: 'You can only delete a loan after it has been marked as returned.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: `Are you sure you want to delete this loan?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        this.loanService.deleteLoan(loan.id!).subscribe({
          next: () => {
            this.loans = this.loans.filter(b => b.id !== loan.id);
            Swal.fire('Deleted!', 'The loan has been deleted.', 'success');
          },
          error: err => {
            console.error('Failed to delete loan:', err);
            Swal.fire('Error', 'Failed to delete the loan. Please try again.', 'error');
          }
        });
      }
    });
  }

  markAsReturned(loanId: string | ''): void {
    this.loanService.returnBook(loanId).subscribe({
      next: res => {
        Swal.fire('Livre retourné avec succès');
        this.loadLoansWithBookDetails();
      },
      error: err => {
        alert('Erreur : ' + (err.error?.error || err.message));
      }
    });
  }
}
