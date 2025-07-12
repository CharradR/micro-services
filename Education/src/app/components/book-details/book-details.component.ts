import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }
  imageUrl: string | undefined;

  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.bookService.getBookById(id).subscribe({
  //       next: (book) => (this.book = book),
  //       error: (err) => console.error('Erreur de chargement :', err)
  //     });
  //   }
  // }
  ngOnInit(): void {
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

borrowBook(bookId: string) {
  if (!this.email) {
    alert('Veuillez entrer votre email.');
    return;
  }

  // this.http.post('/api/loans', {
  //   bookId: bookId,
  //   email: this.email
  // }).subscribe({
  //   next: () => alert("Emprunt effectué ! Vérifiez votre email."),
  //   error: err => alert("Erreur : " + err.error?.message || err.message)
  // });
}
}