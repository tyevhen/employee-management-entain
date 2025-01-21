import { Routes } from '@angular/router';
import { TagsComponent } from './components/tag/tags.component';
import { EmployeesComponent } from './components/employee/employees.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'tags', component: TagsComponent },
  { path: 'employees', component: EmployeesComponent },
];
