import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from 'src/app/services/book.service';

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

borrowBook(id: string | undefined) {
  if (!this.email) {
    alert('Veuillez entrer votre email.');
    return;
  }
   if (!id) {
    alert('Le livre n\'est pas disponible.');
    return;
  }
  // this.http.post('/api/loans', {
  //    bookId: id,
  //    email: this.email
  //  }).subscribe({
  //    next: () => alert("Emprunt effectué ! Vérifiez votre email."),
  //  error: err => alert("Erreur : " + err.error?.message || err.message)
  //  });
}
}
