import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CourseComponent } from './components/course/course.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { BooksComponent } from './components/books/books.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

// Import Keycloak services
import { KeycloakService } from './services/keycloak.service';
import { KeycloakInterceptor } from './services/keycloak.interceptor';
import { KeycloakAuthGuard } from './services/keycloak-auth.guard';
import { AppInitializer } from './services/app-initializer.service';
import { APP_INITIALIZER } from '@angular/core';

// App initializer factory function
export function initializeApp(appInitializer: AppInitializer) {
  return () => appInitializer.init();
}


@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const corsReq = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '*')
    });
    return next.handle(corsReq);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    CoursesComponent,
    TeachersComponent,
    CourseComponent,
    TeacherComponent,
    LoginComponent,
    SignupComponent,
    AddCourseComponent,
    AddTeacherComponent,
    HeaderComponent,
    CourseInfoComponent,
    TeacherInfoComponent,
    BooksComponent,
    ManageBooksComponent,
    BookDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    KeycloakService,
    KeycloakAuthGuard,
    AppInitializer,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializer],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

