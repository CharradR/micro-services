import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    TeachersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
