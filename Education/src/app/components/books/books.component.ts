import { Component, OnInit } from '@angular/core';
import { Book, BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: BookService, private router: Router) {}
  

   ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: data => (this.books = data),
      error: err => console.error('Error fetching books:', err)
    });
  }
  viewBook(id: string): void {
  this.router.navigate(['/books', id]);
}
}
