import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { EditNotiComponent } from './edit-noti/edit-noti.component';
import { ManageTeacherComponent } from './manage-teacher/manage-teacher.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { ViewSubjectComponent } from './view-subject/view-subject.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { CheckResultComponent } from './check-result/check-result.component';
import { ViewTestComponent } from './view-test/view-test.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { EdiMarkComponent } from './edi-mark/edi-mark.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SearchPipe } from './pipes/search.pipe';
import { ResultViewComponent } from './result-view/result-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TeacherComponent,
    StudentComponent,
    AdminComponent,
    TeacherLoginComponent,
    StudentLoginComponent,
    TeacherRegisterComponent,
    HomeComponent,
    NotificationComponent,
    EditTeacherComponent,
    EditNotiComponent,
    ManageTeacherComponent,
    AddClassComponent,
    AddSubjectComponent,
    UpdateSubjectComponent,
    ViewSubjectComponent,
    ViewClassComponent,
    CheckResultComponent,
    ViewTestComponent,
    FilterPipe,
    ViewStudentComponent,
    ViewAdminComponent,
    EdiMarkComponent,
    EditStudentComponent,
    SearchPipe,
    ResultViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatePipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
