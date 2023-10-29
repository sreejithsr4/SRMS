import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { HomeComponent } from './home/home.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { NotificationComponent } from './notification/notification.component';
import { EditNotiComponent } from './edit-noti/edit-noti.component';
import { ManageTeacherComponent } from './manage-teacher/manage-teacher.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { ViewSubjectComponent } from './view-subject/view-subject.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { CheckResultComponent } from './check-result/check-result.component';
import { ViewTestComponent } from './view-test/view-test.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { EdiMarkComponent } from './edi-mark/edi-mark.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ResultViewComponent } from './result-view/result-view.component';

const routes: Routes = [{path:"",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"admin",component:AdminComponent},
{path:"student",component:StudentComponent},
{path:"teacher/:tid",component:TeacherComponent},
{path:"teacher-login",component:TeacherLoginComponent},
{path:"student-login",component:StudentLoginComponent},
{path:"teacher-register",component:TeacherRegisterComponent},
{path:"edit-teacher",component:EditTeacherComponent},
{path:"notification",component:NotificationComponent},
{path:"edit-test/:id",component:EditNotiComponent},
{path:"manage-teacher",component:ManageTeacherComponent},
{path:"add-subject",component:AddSubjectComponent},
{path:"update-subject/:id",component:UpdateSubjectComponent},
{path:"view-subject",component:ViewSubjectComponent},
{path:"add-class",component:AddClassComponent},
{path:"view-class",component:ViewClassComponent},
{path:"check-result/:test",component:CheckResultComponent},
{path:"view-test",component:ViewTestComponent},
{path:"view-student",component:ViewStudentComponent},
{path:"view-admin",component:ViewAdminComponent},
{path:"edit-mark/:id",component:EdiMarkComponent},
{path:"edit-student",component:EditStudentComponent},
{path:"result-view",component:ResultViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
