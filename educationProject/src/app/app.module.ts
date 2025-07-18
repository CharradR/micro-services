import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksComponent } from './components/books/books.component';
import { CourseComponent } from './components/course/course.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoansComponent } from './components/loans/loans.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
//import { AttendanceComponent } from './components/attendance/attendance.component';
//import { StudentsComponent } from './components/students/students.component';
//import { ClassesComponent } from './classes/classes.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakHttpInterceptor } from './services/keycloak.interceptor';
import { APP_INITIALIZER } from '@angular/core';
import { AppInitializerService } from './services/app-initializer.service';
import { DualAuthService } from './services/dual-auth-service';
import { KeycloakService } from './services/keycloak.service';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init();
}

export function initializeDualAuth(
  dualAuthService: DualAuthService,
  keycloakService: KeycloakService
) {
  return () => {
    console.log('🚀 Starting application initialization...');

    return keycloakService.init().then((authenticated) => {
      console.log('🔐 Keycloak initialization complete. Authenticated:', authenticated);

      if (authenticated) {
        console.log('🔐 Keycloak authenticated, starting dual auth sync...');

        // Start personal auth sync after Keycloak success
        // Using setTimeout to prevent blocking app initialization
        setTimeout(() => {
          dualAuthService.syncWithPersonalAuth().subscribe({
            next: (result) => {
              if (result?.success) {
                console.log('✅ Dual auth sync completed successfully');
              } else if (result) {
                console.log('⚠️ Dual auth sync completed with issues, but continuing...');
              } else {
                console.log('ℹ️ Dual auth sync skipped (no sync needed)');
              }
            },
            error: (error) => {
              console.warn('⚠️ Dual auth sync failed, continuing with Keycloak only:', error);
            },
          });
        }, 500); // Small delay to ensure app is fully initialized
      } else {
        console.log('🔓 User not authenticated - login required');
      }

      return authenticated;
    }).catch((error) => {
      console.error('❌ Keycloak initialization failed:', error);
      return false; // Continue app initialization even if Keycloak fails
    });
  };
}
@NgModule({
  declarations: [

    AppComponent,
    AddCourseComponent,
    AddTeacherComponent,
    BookDetailsComponent,
    BooksComponent,
    CourseComponent,
    CourseInfoComponent,
    CoursesComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ManageBooksComponent,
    SignupComponent,
    TeacherComponent,
    TeacherInfoComponent,
    TeachersComponent,
    LoansComponent,
    AddGroupComponent,
    AddStudentComponent,
    AttendanceListComponent,
   // AttendanceComponent,
    //StudentsComponent,
   // ClassesComponent
    StudentDashboardComponent,
    // AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDualAuth,
      multi: true,
      deps: [DualAuthService, KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
