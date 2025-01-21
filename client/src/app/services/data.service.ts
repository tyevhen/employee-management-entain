import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { Employee, EmployeeCreate, Tag, TagCreate } from '../shared/interfaces';
import { createEmployeeFailure, createEmployeeSuccess, createTagSuccess, deleteTagSuccess, setOffices, setTags, updateEmployeeFailure, updateEmployeeSuccess } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private store: Store) {}

  fetchOffices(): Observable<any> {
    return this.http.get('http://localhost:3000/offices');
  }

  fetchTags(): Observable<any> {
    return this.http.get('http://localhost:3000/tags');
  }

  getEmployees(params: {
    page: number;
    limit: number;
    sortBy: string;
    order: 'asc' | 'desc';
  }): Observable<any> {
    const { page, limit, sortBy, order } = params;
    const queryParams = `?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;

    return this.http.get<any>(`http://localhost:3000/employees${queryParams}`);
  }

  loadOfficesAndTags() {
    this.fetchOffices().subscribe((offices) =>
      this.store.dispatch(setOffices({ offices }))
    );
    this.fetchTags().subscribe((tags) =>
      this.store.dispatch(setTags({ tags }))
    );
  }

  updateEmployee(id: string, data: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`http://localhost:3000/employees/${id}`, data)
      .pipe(
        tap((updatedEmployee: Employee) => {
          this.store.dispatch(
            updateEmployeeSuccess({ employee: updatedEmployee })
          );
        }),
        catchError((error) => {
          this.store.dispatch(updateEmployeeFailure({ error }));
          return EMPTY;
        })
      );
  }

  createEmployee(data: EmployeeCreate): Observable<Employee> {
    return this.http
      .post<Employee>('http://localhost:3000/employees', data)
      .pipe(
        tap((createdEmployee: Employee) => {
          this.store.dispatch(
            createEmployeeSuccess({ employee: createdEmployee })
          );
        }),
        catchError((error) => {
          this.store.dispatch(createEmployeeFailure({ error }));
          return EMPTY;
        })
      );
  }

  deleteTag(id: string): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:3000/tags/${id}`)
      .pipe(tap(() => this.store.dispatch(deleteTagSuccess({ id }))));
  }

  createTag(tag: TagCreate): Observable<Tag> {
    return this.http.post<Tag>('http://localhost:3000/tags', tag).pipe(
      tap((createdTag: Tag) => {
        this.store.dispatch(createTagSuccess({ tag: createdTag }));
      })
    );
  }
}
