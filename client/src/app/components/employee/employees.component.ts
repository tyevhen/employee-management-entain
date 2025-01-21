import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Employee, Office, Tag } from '../../shared/interfaces';
import { DataService } from '../../services/data.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { selectAllEmployees } from '../../selectors/employee.selector';
import { setEmployees } from '../../store/employee.actions';
import { selectAllTags } from '../../selectors/tags.selector';
import { selectAllOffices } from '../../selectors/office.selector';
import { MatChipsModule } from '@angular/material/chips';
import { EmployeeEditDialogComponent } from './employee-edit-dialog/employee-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreateDialogComponent } from './employee-create-dialog/employee-create-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employees',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatSortModule,
  ],
  providers: [DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]>;
  tags$: Observable<Tag[]>;
  offices$: Observable<Office[]>;
  columns: string[] = ['firstName', 'lastName', 'birthDate', 'phone', 'office'];
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  sortBy: string = 'firstName';
  order: 'asc' | 'desc' = 'asc';
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private dataService: DataService,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.employees$ = this.store.select(selectAllEmployees);
    this.tags$ = this.store.select(selectAllTags);
    this.offices$ = this.store.select(selectAllOffices);
  }

  ngOnInit(): void {
    this.employees$.subscribe((employees) => {
      this.dataSource.data = employees;
    });
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.dataService
      .getEmployees({
        page: this.page,
        limit: this.limit,
        sortBy: this.sortBy,
        order: this.order,
      })
      .subscribe((response) => {
        const { data, total, page } = response;
        this.total = total;
        this.page = page;
        this.store.dispatch(setEmployees({ employees: data }));
        this.dataSource.data = data;

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
  }

  onPageChange(event: any): void {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadEmployees();
  }

  onSortChange(event: any): void {
    this.sortBy = event.active;
    this.order = event.direction || 'asc';
    this.loadEmployees();
  }

  openEditDialog(employee: Employee): void {
    this.offices$.subscribe((offices) => {
      this.tags$.subscribe((tags) => {
        const dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
          width: '800px',
          data: {
            employee,
            offices,
            tags,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            console.log('Updated employee:', result);
          }
        });
      });
    });
  }

  openCreateDialog(): void {
    this.offices$.subscribe((offices) => {
      this.tags$.subscribe((tags) => {
        const dialogRef = this.dialog.open(EmployeeCreateDialogComponent, {
          width: '800px',
          data: { offices, tags },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            console.log('New employee created:', result);
          }
        });
      });
    });
  }
}
