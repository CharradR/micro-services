import { Component, OnInit } from '@angular/core';
import { Book, BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent {
 editIndex: number | null = null;

  formData: Book = {
    id: '',
    title: '',
    author: '',
    category: '',
    available: false,
    quantity: 0,
  };
  books: Book[] = [];
  constructor(private bookService: BookService) { }
  isFormVisible = false;
  isEditing = false;
  searchTitle = '';

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: data => (this.books = data),
      error: err => console.error('Error fetching books:', err)
    });
  }
  get filteredBooks(): Book[] {
    if (!this.searchTitle) {
      return this.books;
    }
    const query = this.searchTitle.trim().toLowerCase();
    return this.books.filter(book =>
      book.title && book.title.toLowerCase().includes(query)
    );

  }

  // ➕ Ajouter un livre
  addBook(): void {
    this.isFormVisible = true;
    this.isEditing = false;
    this.editIndex = null;
    this.formData = {
      id: '',
      title: '',
      author: '',
      category: '',
      available: false,
      quantity: 0
    };
  }

  // ✏️ Modifier un livre
  editBook(book: Book): void {
    this.isFormVisible = true;
    this.isEditing = true;
    this.formData = { ...book }; // copie TOUT, y compris id (même si on ne l'affiche pas)
    this.editIndex = this.books.findIndex(b => b.id === book.id);
  }
saveBook(): void {
  if (this.isEditing && this.formData.id) {
    // Update existing book
    this.bookService.updateBook(this.formData.id, this.formData).subscribe({
      next: updated => {
        if (this.editIndex !== null) {
          this.books[this.editIndex] = updated;
        }
        this.isFormVisible = false;
      },
      error: err => console.error('Failed to update book:', err)
    });
  } else {
    // Add new book
    const newBook = { ...this.formData };
    if (!newBook.id) {
      delete newBook.id; // ✅ Let the backend (MongoDB) generate the ID
    }

    this.bookService.addBook(newBook).subscribe({
      next: created => {
        this.books.push(created);
        this.isFormVisible = false;
        Swal.fire('Success!', `"${created.title}" has been added.`, 'success');
      },
      error: err => console.error('Failed to add book:', err)
    });
  }
}

deleteBook(book: Book): void {
  if (!book.id) return;

  Swal.fire({
    title: `Are you sure you want to delete "${book.title}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  }).then(result => {
    if (result.isConfirmed) {
      this.bookService.deleteBook(book.id!).subscribe({
        next: () => {
          this.books = this.books.filter(b => b.id !== book.id);
          Swal.fire('Deleted!', `"${book.title}" has been deleted.`, 'success');
        },
        error: err => {
          console.error('Failed to delete book:', err);
          Swal.fire('Error', 'Failed to delete the book. Please try again.', 'error');
        }
      });
    }
  });
}


  // ❌ Supprimer un livre
  // deleteBook(book: Book): void {
  //   if (book.id && confirm(`Are you sure you want to delete "${book.title}"?`)) {
  //     this.bookService.deleteBook(book.id).subscribe({
  //       next: () => {
  //         this.books = this.books.filter(b => b.id !== book.id);
  //       },
  //       error: err => console.error('Failed to delete book:', err)
  //     });
  //   }
  // }

  // 🔙 Annuler formulaire
  cancelForm(): void {
    this.isFormVisible = false;
  }
}
