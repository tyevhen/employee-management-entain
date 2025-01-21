import { createAction, props } from '@ngrx/store';
import { Tag, TagCreate } from '../../shared/interfaces';

export const setTags = createAction(
  '[Tags] Set Tags',
  props<{ tags: Tag[] }>()
);

export const loadTags = createAction('[Tags] Load Tags');

export const loadTagsFailure = createAction(
  '[Tags] Load Tags Failure',
  props<{ error: string }>()
);

export const deleteTag = createAction(
  '[Tags] Delete Tag',
  props<{ id: string }>()
);

export const deleteTagSuccess = createAction(
  '[Tags] Delete Tag Success',
  props<{ id: string }>()
);

export const deleteTagFailure = createAction(
  '[Tags] Delete Tag Failure',
  props<{ error: any }>()
);

export const createTag = createAction('[Tags] Add Tag', props<TagCreate>());

export const createTagSuccess = createAction(
  '[Tags] Add Tag Success',
  props<{ tag: Tag }>()
);

export const createTagFailure = createAction(
  '[Tags] Add Tag Failure',
  props<{ error: string }>()
);
