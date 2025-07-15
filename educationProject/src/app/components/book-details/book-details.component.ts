import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  loading: boolean = false;  // Define the loading property

  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private loanService: LoanService
  ) { }
  imageUrl: string | undefined;

  ngOnInit(): void {
    this.loading = true;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (book) => {
          this.book = book;
          this.imageUrl = `assets/images/book-${book.id}.png`; // 💡 construit dynamiquement l'URL
        },
        error: (err) => console.error('Erreur de chargement :', err)
      });
    }
  }
  email: string = '';

// borrowBook(bookId: string | undefined) {
//   if (!this.email) {
//     alert('Veuillez entrer votre email.');
//     return;
//   }
//    if (!bookId) {
//     alert('Le livre n\'est pas disponible.');
//     return;
//   }
//    this.loanService.borrowBook(bookId, this.email).subscribe({
//   next: () => alert("📚 Emprunt effectué ! Vérifiez votre email."),
//   error: err => alert("❌ Erreur : " + (err.error?.message || err.message))
// });

// }
// borrowBook(bookId: string | undefined) {
//   if (!this.email) {
//     alert('Veuillez entrer votre email.');
//     return;
//   }

//   if (!bookId) {
//     alert('Le livre n\'est pas disponible.');
//     return;
//   }

//   this.loanService.borrowBook(bookId, this.email).subscribe({
//     next: () => alert("📚 Emprunt effectué ! Vérifiez votre email."),
//     error: err => alert("❌ Erreur quantité insuffissante " )
//   });
// }
borrowBook(bookId: string | undefined) {
  if (!this.email) {
    Swal.fire('Oops...', 'Veuillez entrer votre email.', 'warning');
    return;
  }
  if (!bookId) {
    Swal.fire('Erreur', "Le livre n'est pas disponible.", 'error');
    return;
  }

  this.loanService.borrowBook(bookId, this.email).subscribe({
    next: () => {
      Swal.fire('Succès', 'Emprunt effectué ! Vérifiez votre email.', 'success');
    },
    error: err => {
      Swal.fire('Erreur quantité insuffissante');
    }
  });
}

}
