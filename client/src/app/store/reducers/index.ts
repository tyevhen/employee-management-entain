import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { officeReducer, OfficeState } from './office.reducer';
import { tagReducer, TagState } from './tags.reducer';
import { logReducer } from './log.reducer';
import { employeeReducer, EmployeeState } from './employee.reducer';

export interface State {
  offices: OfficeState;
  tags: TagState;
  employees: EmployeeState,
}

export const reducers: ActionReducerMap<State> = {
  offices: officeReducer,
  tags: tagReducer,
  employees: employeeReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [logReducer] : [];
