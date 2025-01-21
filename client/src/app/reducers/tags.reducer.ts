import { createReducer, on } from '@ngrx/store';
import { setTags, loadTags, loadTagsFailure, deleteTag, deleteTagSuccess, deleteTagFailure, createTagSuccess } from '../store';
import { Tag } from '../shared/interfaces';

export interface TagState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

export const initialState: TagState = {
  tags: [],
  loading: false,
  error: null,
};

export const tagReducer = createReducer(
  initialState,
  on(loadTags, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(setTags, (state, { tags }) => ({
    ...state,
    tags: [...tags],
    loading: false,
    error: null,
  })),
  on(loadTagsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(deleteTag, (state) => ({
    ...state,
    loading: true,
  })),
  on(deleteTagSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    tags: state.tags.filter((tag) => tag.id !== id),
  })),
  on(deleteTagFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createTagSuccess, (state, { tag }) => ({
    ...state,
    tags: [...state.tags, tag],
    loading: false,
    error: null,
  }))
);
