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
    { path: 'books/:id', component: BookDetailsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}