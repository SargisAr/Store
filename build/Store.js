"use strict";
/**======================Interfaces======================*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreErrorEnum = void 0;
/**======================Enums======================*/
/**
 * Error Messages Enum
 * Example:
 * throw new Error(StoreErrorEnum.propsNotPassed)
 */
var StoreErrorEnum;
(function (StoreErrorEnum) {
    StoreErrorEnum["propsNotPassed"] = "Argument \"Props\" was not passed";
    StoreErrorEnum["actionNoFound"] = "No action found with the same name";
    StoreErrorEnum["reducerNoFound"] = "No reducer with this name was found";
    StoreErrorEnum["selectorNoFound"] = "No selector found with this name";
})(StoreErrorEnum = exports.StoreErrorEnum || (exports.StoreErrorEnum = {}));
/**======================Observer Class======================*/
/**
 * Observer
 * Example:
 * new Observer()
 */
var Observer = /** @class */ (function () {
    function Observer() {
        /**
         * Observers List
         * Example:
         * [() => {...do something}]
         */
        this.observers = [];
    }
    /**
     * Subscribe to Observer
     * Example:
     * new Observer().subscribe(() => {...do something})
     * @param func
     */
    Observer.prototype.subscribe = function (func) {
        this.observers.push(func);
    };
    /**
     * Next value to Observer
     * Example:
     * new Observer().next(data or null)
     * @param data
     */
    Observer.prototype.next = function (data) {
        this.observers.forEach(function (subscriber) { return subscriber(data); });
    };
    return Observer;
}());
/**======================Store Class======================*/
/**
 * Store
 * Example:
 * const store = Store.create()
 */
var Store = /** @class */ (function () {
    function Store(
    /**
     * Main State
     * Example:
     * {user: {name: 'Bob', age: 23}}
     */
    state, 
    /**
     * Reducers List
     * Example:
     * {'[USER] create': Observer { observers: [...] }}
     */
    reducers, 
    /**
     * Actions List
     * Example:
     * {'[USER] create': { name: '[USER] create', props: true }}
     */
    actions, 
    /**
     * Selectors List
     * Example:
     * {users: () => {...do something}}
     */
    selectors) {
        if (state === void 0) { state = {}; }
        if (reducers === void 0) { reducers = {}; }
        if (actions === void 0) { actions = {}; }
        if (selectors === void 0) { selectors = {}; }
        this.state = state;
        this.reducers = reducers;
        this.actions = actions;
        this.selectors = selectors;
    }
    /**
     * Store Create Function
     * Example:
     * const store = Store.create()
     */
    Store.create = function () {
        return !Store.instance ? (Store.instance = new Store()) : Store.instance;
    };
    /**
     * Action Create Function
     * Example:
     * export const userCreateAction = store.createActions('[USER] create', true or false);
     * @param name
     * @param props (optional)
     */
    Store.prototype.createActions = function (name, props) {
        this.actions[name] = { name: name, props: props || false };
        return name;
    };
    /**
     * Reducer Create Function
     * Example:
     * const userCreateReducer = store.createReducer(someAction);
     * @param actionName
     */
    Store.prototype.createReducer = function (actionName) {
        this.reducers[actionName] = new Observer();
        return actionName;
    };
    /**
     * Selector Create Function
     * Example:
     * const userListSelector = store.createSelector('users', (state) => state.user);
     * @param key
     * @param func
     */
    Store.prototype.createSelector = function (key, func) {
        var _this = this;
        this.selectors[key] = function () { return func(_this.state); };
        return key;
    };
    /**
     * Function fo dispatching action
     * Example:
     * store.dispatch(userCreateAction, {name: 'Bob', age: 23});
     * @param action
     * @param props (optional)
     */
    Store.prototype.dispatch = function (action, props) {
        if (this.actions[action] === undefined)
            throw new Error(StoreErrorEnum.actionNoFound);
        if (this.reducers[action] === undefined)
            throw new Error(StoreErrorEnum.reducerNoFound);
        if (this.actions[action].props && props === undefined)
            throw new Error(StoreErrorEnum.propsNotPassed);
        this.reducers[action].next(props || null);
    };
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
    Store.prototype.on = function (action, callback) {
        var _this = this;
        this.reducers[action].subscribe(function (data) { return (_this.state = callback(_this.state, data)); });
    };
    /**
     * Select data from State
     * Example:
     * console.log(store.select(userListSelector));
     * @param selectorName
     */
    Store.prototype.select = function (selectorName) {
        if (this.selectors[selectorName] === undefined)
            throw new Error(StoreErrorEnum.selectorNoFound);
        return this.selectors[selectorName](this.state);
    };
    Object.defineProperty(Store.prototype, "getActionList", {
        /**
         * Getter for Actions List
         * Example:
         * console.log(store.getActionList)
         */
        get: function () {
            return this.actions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "getReducersList", {
        /**
         * Getter for Reducers List
         * Example:
         * console.log(store.getReducersList)
         */
        get: function () {
            return this.reducers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "getSelectorsList", {
        /**
         * Getter for Selectors List
         * Example:
         * console.log(store.getSelectorsList)
         */
        get: function () {
            return this.selectors;
        },
        enumerable: false,
        configurable: true
    });
    return Store;
}());
exports.default = Store;
