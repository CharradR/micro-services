import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  error: string = '';

  // Modal properties
  showModal: boolean = false;
  selectedUser: User | null = null;

  // Delete confirmation
  showDeleteConfirm: boolean = false;
  userToDelete: User | null = null;
  deleting: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        console.log('Users loaded:', users);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.error = 'Failed to load users. Please check if you have admin permissions.';
        this.loading = false;
      }
    });
  }

  getUserRoles(user: User): string {
    if (!user.roles || user.roles.length === 0) {
      return 'No roles assigned';
    }
    return user.roles.map(role => role.name).join(', ');
  }

  refreshUsers(): void {
    this.loadUsers();
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }

  // Modal methods
  viewUser(user: User): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  // Delete methods
  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.userToDelete = null;
  }

  deleteUser(): void {
    if (!this.userToDelete) return;

    this.deleting = true;
    const userId = this.userToDelete.id;

    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('User deleted successfully:', response);
        // Remove user from local array
        this.users = this.users.filter(user => user.id !== userId);
        this.cancelDelete();
        this.deleting = false;
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.error = 'Failed to delete user. Please try again.';
        this.deleting = false;
      }
    });
  }
}
