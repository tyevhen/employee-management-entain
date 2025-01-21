import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagState } from '../reducers/tags.reducer';

export const selectTagState = createFeatureSelector<TagState>('tags');

export const selectAllTags = createSelector(
  selectTagState,
  (state) => state.tags
);

export const selectTagLoading = createSelector(
  selectTagState,
  (state) => state.loading
);
