import { Component, OnInit } from '@angular/core';
import { Book, BookService } from 'src/app/services/book.service';
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


  // 💾 Enregistrer (ajout ou modification)
  saveBook(): void {
    if (this.isEditing && this.formData.id) {
      // mode édition
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
      // mode ajout
      this.bookService.addBook(this.formData).subscribe({
        next: created => {
          this.books.push(created);
          this.isFormVisible = false;
        },
        error: err => console.error('Failed to add book:', err)
      });
    }
  }

  // ❌ Supprimer un livre
  deleteBook(book: Book): void {
    if (book.id && confirm(`Are you sure you want to delete "${book.title}"?`)) {
      this.bookService.deleteBook(book.id).subscribe({
        next: () => {
          this.books = this.books.filter(b => b.id !== book.id);
        },
        error: err => console.error('Failed to delete book:', err)
      });
    }
  }

  // 🔙 Annuler formulaire
  cancelForm(): void {
    this.isFormVisible = false;
  }
}
