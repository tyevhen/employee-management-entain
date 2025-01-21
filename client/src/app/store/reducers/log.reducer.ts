import { ActionReducer } from '@ngrx/store';

export function logReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('Previous state:', state);
    console.log('Action:', action);
    const nextState = reducer(state, action);
    console.log('Next state:', nextState);
    return nextState;
  };
}
