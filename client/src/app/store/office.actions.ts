import { createAction, props } from '@ngrx/store';
import { Office } from '../shared/interfaces';

export const setOffices = createAction(
  '[Offices] Set Offices',
  props<{ offices: Office[] }>()
);

export const loadOffices = createAction('[Offices] Load Offices');

export const loadOfficesFailure = createAction(
  '[Offices] Load Offices Failure',
  props<{ error: string }>()
);
