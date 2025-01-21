import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfficeState } from '../reducers/office.reducer';

export const selectOfficeState = createFeatureSelector<OfficeState>('offices');

export const selectAllOffices = createSelector(
  selectOfficeState,
  (state) => state.offices
);

export const selectOfficesLoading = createSelector(
  selectOfficeState,
  (state) => state.loading
);
