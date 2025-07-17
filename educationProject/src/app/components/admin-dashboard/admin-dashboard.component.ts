import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading: boolean = true;
  error: string = '';

  // Search and filter properties
  searchTerm: string = '';
  selectedRole: string = '';
  sortBy: string = 'username';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Available roles for filtering
  availableRoles: string[] = [];

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
        this.filteredUsers = [...users];
        this.extractAvailableRoles();
        this.applyFilters();
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

  // Extract unique roles from all users
  extractAvailableRoles(): void {
    const roleSet = new Set<string>();
    this.users.forEach(user => {
      if (user.roles && user.roles.length > 0) {
        user.roles.forEach(role => roleSet.add(role.name));
      }
    });
    this.availableRoles = Array.from(roleSet).sort();
  }

  // Apply search and filter
  applyFilters(): void {
    let filtered = [...this.users];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        this.getUserRoles(user).toLowerCase().includes(searchLower)
      );
    }

    // Apply role filter
    if (this.selectedRole) {
      filtered = filtered.filter(user => 
        user.roles && user.roles.some(role => role.name === this.selectedRole)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA: any, valueB: any;
      
      switch (this.sortBy) {
        case 'username':
          valueA = a.username;
          valueB = b.username;
          break;
        case 'email':
          valueA = a.email;
          valueB = b.email;
          break;
        case 'id':
          valueA = a.id;
          valueB = b.id;
          break;
        default:
          valueA = a.username;
          valueB = b.username;
      }

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredUsers = filtered;
  }

  // Search methods
  onSearchChange(): void {
    this.applyFilters();
  }

  onRoleFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedRole = '';
    this.sortBy = 'username';
    this.sortDirection = 'asc';
    this.applyFilters();
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
