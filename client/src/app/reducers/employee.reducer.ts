import { createReducer, on } from '@ngrx/store';
import { Employee } from '../shared/interfaces';
import {
  loadEmployees,
  setEmployees,
  loadEmployeesFailure,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  createEmployeeSuccess,
  createEmployeeFailure,
} from '../store/employee.actions';

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
  on(deleteEmployeeFailure, (state, { error }) => ({
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
  })),
  on(deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    employees: state.employees.filter((employee) => employee.id !== id),
  })),
  on(deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
