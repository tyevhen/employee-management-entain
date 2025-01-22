import { createReducer, on } from '@ngrx/store';

import { Employee } from '../../shared/interfaces';
import {
  loadEmployees,
  setEmployees,
  loadEmployeesFailure,
  createEmployeeSuccess,
  createEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeFailure,
} from '../actions';

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeReducer = createReducer(
  initialState,
  on(loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(setEmployees, (state, { employees }) => ({
    ...state,
    employees: [...employees],
    loading: false,
    error: null,
  })),
  on(loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false,
    error: null,
  })),
  on(createEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    loading: false,
    employees: state.employees.map((currentEmployee) =>
      currentEmployee.id === employee.id
        ? { ...currentEmployee, ...employee }
        : currentEmployee
    ),
  })),
  on(updateEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
