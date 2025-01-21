import { createAction, props } from '@ngrx/store';
import { Employee, EmployeeCreate } from '../../shared/interfaces';

export const loadEmployees = createAction('[Employee] Load Employees');
export const setEmployees = createAction(
  '[Employee] Set Employees',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: string }>()
);

export const createEmployee = createAction(
  '[Employee] Create Employee',
  props<{ employee: EmployeeCreate }>()
);

export const createEmployeeSuccess = createAction(
  '[Employee] Create Employee Success',
  props<{ employee: Employee }>()
);

export const createEmployeeFailure = createAction(
  '[Employee] Create Employee Failure',
  props<{ error: string }>()
);

export const updateEmployeeSuccess = createAction(
  '[Employee] Update Employee Success',
  props<{ employee: Employee }>()
);

export const updateEmployeeFailure = createAction(
  '[Employee] Update Employee failure',
  props<{ error: string }>()
);

export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: string }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ id: string }>()
);

export const deleteEmployeeFailure = createAction(
  '[Employee] Delete Employee Failure',
  props<{ error: string }>()
);
