# Store
***
### [_Created By_ SargisAr](https://github.com/SargisAr)
[![N|Solid](https://avatars.githubusercontent.com/u/88671120?s=40&v=4)](https://github.com/SargisAr)


My implementation of the popular [NgRx](https://ngrx.io/). technology.
This is an attempt to recreate the logic of this technology
based on the TypeScript programming language.

## Quick Start
***
```sh
import { Store } from './store/Store';
export const store = Store.create();

export enum UserAction {
  create = '[USER] create',
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
```

## Installation
***
Store requires [Node.js](https://nodejs.org/) v16.10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd project-name
npm i
npm start
```

## Usage
***
### Store Initialization

```ts
import { Store } from './store/Store';

export const store = Store.create();
```

### Create Action

>**`createActions();`** 

| Property      | Type  | Description  |
| ----------- | ----------- | ----------- |
| Action Type      | **String**       | Describes the action that will be dispatched       |
| Props Config **(Optional)**   | **Boolean**        | Additional metadata needed for the handling of the action. See Usage  Notes. Optional. Default is **false**.        |
```ts
import { Store } from './store/Store';

export const store = Store.create();

export enum UserAction {
  create = '[USER] create',
}

export const userCreateAction = store.createActions(UserAction.create, true);
```
### Create Reducer

>**`createReducer();`** 

| Property      | Type  | Description  |
| ----------- | ----------- | ----------- |
| Action Name      | **String**       |The name of the action for which it will be created reducer      |

```ts
import { Store } from './store/Store';

export const store = Store.create();

export const userCreateReducer = store.createReducer(userCreateAction);
```

### Dispatch Action

>**`dispatch();`** 

| Property      | Type  | Description  |
| ----------- | ----------- | ----------- |
| Action      | **Action**       |Action name for dispatching       |
| Props (Optional)      | **Object**       |Data for further processing      |

```ts
import { Store } from './store/Store';

export const store = Store.create();

store.dispatch(userCreateAction,{name: 'Bob', age: 23});
```
### Detect Action Dispatch

>**`on();`** 

| Property      | Type  | Description  |
| ----------- | ----------- | ----------- |
| Action      | **Action**       |Action name for dispatching       |
| Callback      | **Function**       |The function to be called when action dispatched      |

```ts
import { Store } from './store/Store';

export const store = Store.create();

store.on(userCreateAction, (state, props) => {
  return {
    ...state,
    user: props
  }
});
```

### Create Selector

>**`createSelector();`** 

| Property      | Type  | Description  |
| ----------- | ----------- | ----------- |
| Key      | **String**       |The name of the key under which the data will be stored       |
| Callback      | **Function**       |Returns data from State      |

```ts
import { Store } from './store/Store';

export const store = Store.create();

const userListSelector = store.createSelector('users', (state) => {
  return state.user
});

console.log(store.select(userListSelector)); // { name: 'Bob', age: 23 }
```

## License

ISC

Copyright (c) 2022, Sargis Artashyan <sargis.artashyan.l@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

**THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.**

