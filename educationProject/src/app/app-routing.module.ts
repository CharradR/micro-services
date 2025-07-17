import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { BooksComponent } from './components/books/books.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { LoansComponent } from './components/loans/loans.component';
<<<<<<< HEAD
import { KeycloakAuthGuard } from './services/keycloak-auth.guard';


const routes: Routes = [
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [KeycloakAuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'student-dashboard',
    loadComponent: () => import('./components/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
    canActivate: [KeycloakAuthGuard],
    data: { roles: ['ROLE_STUDENT'] }
  },
  // { path: 'unauthorized', component: UnauthorizedComponent },
=======
import {ClassesComponent} from "./classes/classes.component";
import {StudentsComponent} from "./components/students/students.component";
import {AttendanceComponent} from "./components/attendance/attendance.component";
import {AddGroupComponent} from "./components/add-group/add-group.component";
import {AddStudentComponent} from "./components/add-student/add-student.component";
import {AttendanceListComponent} from "./components/attendance-list/attendance-list.component";


const routes: Routes = [
    // http://localhost:4200/
    { path: "", component: HomeComponent},
    // http://localhost:4200/teachers
    { path: "teachers", component: TeachersComponent},
    // http://localhost:4200/teachers
    { path: "courses", component: CoursesComponent},
    // http://localhost:4200/login
    { path: "login", component: LoginComponent},
    // http://localhost:4200/signup
    { path: "signup", component: SignupComponent},
    // http://localhost:4200/addCourse
    { path: "addCourse", component: AddCourseComponent},
    // http://localhost:4200/addTeacher
    { path: "addTeacher", component: AddTeacherComponent},
    // http://localhost:4200/courses/courseInfo
    { path: "courses/courseInfo", component: CourseInfoComponent},
    // http://localhost:4200/teacher
    { path: "teacher", component: TeacherComponent},
    // http://localhost:4200//teacherInfo
    { path: "teacherInfo", component: TeacherInfoComponent},
    { path: "books", component: BooksComponent},
    { path: "loans", component: LoansComponent},
    { path: "books/manage", component: ManageBooksComponent},
    { path: 'books/:id', component: BookDetailsComponent},
  {path:'classes',component:ClassesComponent},
  {path:'students/:id',component:StudentsComponent},
  {path:'attendance',component:AttendanceComponent},
  {path:'create/group',component:AddGroupComponent},
  {path:'create/student/:classId',component:AddStudentComponent},
  {path:'attendance-list/:id',component:AttendanceListComponent}

>>>>>>> origin/add-attendance-student-microservices

  // http://localhost:4200/
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  // http://localhost:4200/teachers
  { path: "teachers", component: TeachersComponent },
  // http://localhost:4200/teachers
  { path: "courses", component: CoursesComponent },
  // http://localhost:4200/login
  { path: "login", component: LoginComponent },
  // http://localhost:4200/signup
  { path: "signup", component: SignupComponent },
  // http://localhost:4200/addCourse
  { path: "addCourse", component: AddCourseComponent },
  // http://localhost:4200/addTeacher
  { path: "addTeacher", component: AddTeacherComponent },
  // http://localhost:4200/courses/courseInfo
  { path: "courses/courseInfo", component: CourseInfoComponent },
  // http://localhost:4200/teacher
  { path: "teacher", component: TeacherComponent },
  // http://localhost:4200//teacherInfo
  { path: "teacherInfo", component: TeacherInfoComponent },
  { path: "books", component: BooksComponent },
  { path: "loans", component: LoansComponent },
  { path: "books/manage", component: ManageBooksComponent },
  { path: 'books/:id', component: BookDetailsComponent },

  // Wildcard route - must be last
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

<<<<<<< HEAD
export class AppRoutingModule { }
=======
export class AppRoutingModule {}
>>>>>>> origin/add-attendance-student-microservices
