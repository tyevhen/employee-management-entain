import { Routes } from '@angular/router';
import { OfficesComponent } from './components/offices.component';
import { TagsComponent } from './components/tag/tags.component';
import { EmployeesComponent } from './components/employee/employees.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'offices', component: OfficesComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'employees', component: EmployeesComponent },
];
