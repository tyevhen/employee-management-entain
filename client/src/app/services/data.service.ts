import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { Employee, EmployeeCreate, Tag, TagCreate } from '../shared/interfaces';
import {
  createEmployeeFailure,
  createEmployeeSuccess,
  createTagSuccess,
  deleteTagSuccess,
  setOffices,
  setTags,
  updateEmployeeFailure,
  updateEmployeeSuccess,
} from '../store/actions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient, private store: Store) {}

  fetchOffices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/offices`);
  }

  fetchTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags`);
  }

  getEmployees(params: {
    page: number;
    limit: number;
    sortBy: string;
    order: 'asc' | 'desc';
  }): Observable<any> {
    const { page, limit, sortBy, order } = params;
    const queryParams = `?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;

    return this.http.get<any>(`${this.apiUrl}/employees${queryParams}`);
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
    return this.http.put<Employee>(`${this.apiUrl}/employees/${id}`, data).pipe(
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
    return this.http.post<Employee>(`${this.apiUrl}/employees`, data).pipe(
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
      .delete<void>(`${this.apiUrl}/tags/${id}`)
      .pipe(tap(() => this.store.dispatch(deleteTagSuccess({ id }))));
  }

  createTag(tag: TagCreate): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}/tags`, tag).pipe(
      tap((createdTag: Tag) => {
        this.store.dispatch(createTagSuccess({ tag: createdTag }));
      })
    );
  }
}
