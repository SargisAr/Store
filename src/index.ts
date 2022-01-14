import { Store } from './store/Store';
export const store = Store.create();

export enum UserAction {
  create = '[USER] create',
  getAll = '[USER] Get All',
  getOne = '[USER] Get One',
}

export const userCreateAction = store.createActions(UserAction.create, true);
export const userCreateReducer = store.createReducer(userCreateAction);
store.on(userCreateAction, (state, props) => {
  return {
    ...state,
    user: props
  }
});
store.dispatch(userCreateAction,{name: 'Bob', age: 23});
const userListSelector = store.createSelector('users', (state) => {
  return state.user
});

console.log(store.select(userListSelector));

