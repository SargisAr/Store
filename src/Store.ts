/**======================Interfaces======================*/

/**
 * State Interface
 * Example:
 * {user: {name:'Bob', age: 23}}
 */
export interface StateInterface {
  [key: string]: unknown;
}

/**
 * Reducer List Interface
 * Example:
 * {user: new Observer()}
 */
export interface ReducerListInterface {
  [key: string]: Observer;
}

/**
 * Action List Interface
 * Example:
 * {'[USER] get one': {
 *   name: '[USER] get one,
 *   props: true or false
 * }}
 */
export interface ActionsListInterface {
  [key: string]: {
    name: string;
    props: unknown;
  };
}

/**
 * Selector Interface
 * Example:
 * {user: (state: StateInterface) => state.user }
 */
export interface SelectorInterface {
  [key: string]: (state: StateInterface) => unknown;
}

/**======================Enums======================*/

/**
 * Error Messages Enum
 * Example:
 * throw new Error(StoreErrorEnum.propsNotPassed)
 */
export enum StoreErrorEnum {
  propsNotPassed = 'Argument "Props" was not passed',
  actionNoFound = 'No action found with the same name',
  reducerNoFound = 'No reducer with this name was found',
  selectorNoFound = 'No selector found with this name',
}

/**======================Observer Class======================*/

/**
 * Observer
 * Example:
 * new Observer()
 */
class Observer {
  constructor() {}

  /**
   * Observers List
   * Example:
   * [() => {...do something}]
   */
  public observers: Function[] = [];

  /**
   * Subscribe to Observer
   * Example:
   * new Observer().subscribe(() => {...do something})
   * @param func
   */
  public subscribe(func: Function) {
    this.observers.push(func);
  }

  /**
   * Next value to Observer
   * Example:
   * new Observer().next(data or null)
   * @param data
   */
  public next(data: unknown) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

/**======================Store Class======================*/

/**
 * Store
 * Example:
 * const store = Store.create()
 */
export default class Store {
  /**
   * Store Instance
   */
  private static instance: Store;

  /**
   * Store Create Function
   * Example:
   * const store = Store.create()
   */
  public static create(): Store {
    return !Store.instance ? (Store.instance = new Store()) : Store.instance;
  }

  private constructor(
    /**
     * Main State
     * Example:
     * {user: {name: 'Bob', age: 23}}
     */
    private state: StateInterface = {} as StateInterface,
    /**
     * Reducers List
     * Example:
     * {'[USER] create': Observer { observers: [...] }}
     */
    private reducers: ReducerListInterface = {} as ReducerListInterface,
    /**
     * Actions List
     * Example:
     * {'[USER] create': { name: '[USER] create', props: true }}
     */
    private actions: ActionsListInterface = {} as ActionsListInterface,
    /**
     * Selectors List
     * Example:
     * {users: () => {...do something}}
     */
    private selectors: SelectorInterface = {} as SelectorInterface,
  ) {}

  /**
   * Action Create Function
   * Example:
   * export const userCreateAction = store.createActions('[USER] create', true or false);
   * @param name
   * @param props (optional)
   */
  public createActions(name: string, props?: boolean): string {
    this.actions[name] = { name: name, props: props || false };
    return name;
  }

  /**
   * Reducer Create Function
   * Example:
   * const userCreateReducer = store.createReducer(someAction);
   * @param actionName
   */
  public createReducer(actionName: string): string {
    this.reducers[actionName] = new Observer();
    return actionName;
  }

  /**
   * Selector Create Function
   * Example:
   * const userListSelector = store.createSelector('users', (state) => state.user);
   * @param key
   * @param func
   */
  public createSelector(
    key: string,
    func: (state: StateInterface) => unknown,
  ): string {
    this.selectors[key] = () => func(this.state);
    return key;
  }

  /**
   * Function fo dispatching action
   * Example:
   * store.dispatch(userCreateAction, {name: 'Bob', age: 23});
   * @param action
   * @param props (optional)
   */
  public dispatch(action: string, props?: unknown): void {
    if (this.actions[action] === undefined)
      throw new Error(StoreErrorEnum.actionNoFound);
    if (this.reducers[action] === undefined)
      throw new Error(StoreErrorEnum.reducerNoFound);
    if (this.actions[action].props && props === undefined)
      throw new Error(StoreErrorEnum.propsNotPassed);
    this.reducers[action].next(props || null);
  }

  /**
   * Function for changing State
   * store.on(userCreateAction, (state, props) => {
      return {
        ...state,
        user: props
       }
     });
   * @param action
   * @param callback
   */
  public on(
    action: string,
    callback: (state: StateInterface, props: unknown) => StateInterface,
  ): void {
    this.reducers[action].subscribe(
      (data: StateInterface) => (this.state = callback(this.state, data)),
    );
  }

  /**
   * Select data from State
   * Example:
   * console.log(store.select(userListSelector));
   * @param selectorName
   */
  public select(selectorName: string): unknown {
    if (this.selectors[selectorName] === undefined)
      throw new Error(StoreErrorEnum.selectorNoFound);
    return this.selectors[selectorName](this.state);
  }

  /**
   * Getter for Actions List
   * Example:
   * console.log(store.getActionList)
   */
  public get getActionList(): ActionsListInterface {
    return this.actions;
  }

  /**
   * Getter for Reducers List
   * Example:
   * console.log(store.getReducersList)
   */
  public get getReducersList(): ReducerListInterface {
    return this.reducers;
  }

  /**
   * Getter for Selectors List
   * Example:
   * console.log(store.getSelectorsList)
   */
  public get getSelectorsList(): SelectorInterface {
    return this.selectors;
  }
}
