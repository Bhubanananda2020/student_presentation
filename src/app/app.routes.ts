import { Routes } from '@angular/router';
import { StudentsComponent } from './business/components/students/students.component';
import { StudentDetailsComponent } from './business/components/students/student-details/student-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  {
    path: 'students/details',
    component: StudentDetailsComponent,
  },
  {
    path: 'students/create',
    component: StudentDetailsComponent,
  },
];
