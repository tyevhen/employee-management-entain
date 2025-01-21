import { createReducer, on } from '@ngrx/store';
import { setOffices, loadOffices, loadOfficesFailure } from '../store';
import { Office } from '../shared/interfaces';

export interface OfficeState {
  offices: Office[];
  loading: boolean;
  error: string | null;
}

export const initialState: OfficeState = {
  offices: [],
  loading: false,
  error: null,
};

export const officeReducer = createReducer(
  initialState,
  on(loadOffices, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(setOffices, (state, { offices }) => ({
    ...state,
    offices: [...offices],
    loading: false,
    error: null,
  })),
  on(loadOfficesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
