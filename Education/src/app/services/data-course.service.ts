import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from './keycloak.service';

export interface Course {
  id?: number;
  title: string;
  description: string;
  duration: number;
  instructor: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataCourseService {
  private apiUrl = 'http://localhost:8083/api/courses'; // Gateway URL

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) { }

  /**
   * Get all courses
   * The Keycloak interceptor will automatically add the JWT token
   */
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  /**
   * Get course by ID
   */
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new course
   * Requires authentication - token will be added automatically
   */
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  /**
   * Update an existing course
   * Requires authentication - token will be added automatically
   */
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  /**
   * Delete a course
   * Requires authentication - token will be added automatically
   */
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Example: Get courses with custom headers (manual token handling)
   */
  getCoursesWithCustomHeaders(): Observable<Course[]> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-value'
    });

    return this.http.get<Course[]>(this.apiUrl, { headers });
  }

  /**
   * Check if user can manage courses (example role check)
   */
  canManageCourses(): boolean {
    return this.keycloakService.hasRole('course-manager') ||
           this.keycloakService.hasRole('admin');
  }

  /**
   * Check if user can view courses
   */
  canViewCourses(): boolean {
    return this.keycloakService.isAuthenticated();
  }
}
