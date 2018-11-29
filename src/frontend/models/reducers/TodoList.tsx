/********************************************************************************
 *                                                                               *
 *   Redux Reducers and React Context API Provider/Consumer for state TodoList   *
 *   Generated by ts2redux from Source file ../TodoList.ts                       *
 *                                                                               *
 ********************************************************************************/

import axios from "axios";
import { TodoListItem } from "../interfaces";

export type TaskState = "UNDEFINED" | "RUNNING" | "LOADED" | "ERROR";
export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}

const sortFn = (order: SortOrder) => (a: TodoListItem, b: TodoListItem) => {
  if (order === SortOrder.ASC) return a.id - b.id;
  return b.id - a.id;
};

/**
 * @redux true
 */
export class TodoList {
  items: TodoListItem[] = [];
  state: TaskState = "UNDEFINED";
  stateError: any;
  sortOrder: SortOrder = SortOrder.ASC;
  listStart = 0;
  listPageLength = 10;
  listTitle = "Title of TODO -list";
  // Example of memoized list using reselect
  get listToDisplay(): TodoListItem[] {
    return this.items
      .filter(item => item.completed)
      .sort(sortFn(this.sortOrder))
      .slice(this.listStart, this.listStart + this.listPageLength);
  }
  nextPage() {
    this.listStart += this.listPageLength;
  }
  prevPage() {
    this.listStart -= this.listPageLength;
    if (this.listStart < 0) this.listStart = 0;
  }
  toggleSortOrder() {
    this.sortOrder =
      this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
  }
  clearTodoList() {
    this.items = [];
  }
  reverse() {
    this.items.reverse();
  }
  sortById() {
    this.items.sort((a, b) => a.id - b.id);
  }
  sortByTitle() {
    this.items.sort((a, b) => a.title.localeCompare(b.title));
  }
  sortByCompletion() {
    const toNumber = (value: boolean): number => (value ? 1 : 0);
    this.items.sort((a, b) => toNumber(a.completed) - toNumber(b.completed));
  }
  setTitle(value: string) {
    this.listTitle = value;
  }
  /**
   * Fetch items from json placeholder service
   */
  async getItems() {
    if (this.state === "RUNNING") return;
    try {
      this.state = "RUNNING";
      this.items = (await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      )).data;
      this.state = "LOADED";
    } catch (e) {
      this.state = "ERROR";
      this.stateError = e;
    }
  }
}

import * as immer from "immer";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";

export interface IContainerPropsMethods {
  nextPage: () => any;
  prevPage: () => any;
  toggleSortOrder: () => any;
  clearTodoList: () => any;
  reverse: () => any;
  sortById: () => any;
  sortByTitle: () => any;
  sortByCompletion: () => any;
  setTitle: (value: string) => any;
  getItems: () => any;
}
export interface ITodoList {
  items: TodoListItem[];
  state: TaskState;
  stateError: any;
  sortOrder: SortOrder;
  listStart: number;
  listPageLength: number;
  listTitle: string;
}
export const itemsSelectorFn = (state: ITodoList): TodoListItem[] =>
  state.items;
export const stateSelectorFn = (state: ITodoList): TaskState => state.state;
export const stateErrorSelectorFn = (state: ITodoList): any => state.stateError;
export const sortOrderSelectorFn = (state: ITodoList): SortOrder =>
  state.sortOrder;
export const listStartSelectorFn = (state: ITodoList): number =>
  state.listStart;
export const listPageLengthSelectorFn = (state: ITodoList): number =>
  state.listPageLength;
export const listTitleSelectorFn = (state: ITodoList): string =>
  state.listTitle;
export const listToDisplaySelectorFnCreator = () =>
  createSelector(
    [
      itemsSelectorFn,
      sortOrderSelectorFn,
      listStartSelectorFn,
      listPageLengthSelectorFn
    ],
    (items, sortOrder, listStart, listPageLength) => {
      const o = new TodoList();
      o.items = items;
      o.sortOrder = sortOrder;
      o.listStart = listStart;
      o.listPageLength = listPageLength;
      return o.listToDisplay;
    }
  );
export const listToDisplaySelector = listToDisplaySelectorFnCreator();

export interface IContainerPropsState extends ITodoList {
  listToDisplay: TodoListItem[];
}
export interface IProps extends IContainerPropsState, IContainerPropsMethods {}
export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    items: state.TodoList.items,
    state: state.TodoList.state,
    stateError: state.TodoList.stateError,
    sortOrder: state.TodoList.sortOrder,
    listStart: state.TodoList.listStart,
    listPageLength: state.TodoList.listPageLength,
    listTitle: state.TodoList.listTitle,
    listToDisplay: listToDisplaySelector(state.TodoList)
  };
};
export const mapDispatchToProps = (dispatch: any): IContainerPropsMethods => {
  return {
    nextPage: () => {
      return dispatch(RTodoList.nextPage());
    },
    prevPage: () => {
      return dispatch(RTodoList.prevPage());
    },
    toggleSortOrder: () => {
      return dispatch(RTodoList.toggleSortOrder());
    },
    clearTodoList: () => {
      return dispatch(RTodoList.clearTodoList());
    },
    reverse: () => {
      return dispatch(RTodoList.reverse());
    },
    sortById: () => {
      return dispatch(RTodoList.sortById());
    },
    sortByTitle: () => {
      return dispatch(RTodoList.sortByTitle());
    },
    sortByCompletion: () => {
      return dispatch(RTodoList.sortByCompletion());
    },
    setTitle: (value: string) => {
      return dispatch(RTodoList.setTitle(value));
    },
    getItems: () => {
      return dispatch(RTodoList.getItems());
    }
  };
};
export const StateConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const initTodoList = () => {
  const o = new TodoList();
  return {
    items: o.items,
    state: o.state,
    stateError: o.stateError,
    sortOrder: o.sortOrder,
    listStart: o.listStart,
    listPageLength: o.listPageLength,
    listTitle: o.listTitle
  };
};
const initWithMethodsTodoList = () => {
  const o = new TodoList();
  return {
    items: o.items,
    state: o.state,
    stateError: o.stateError,
    sortOrder: o.sortOrder,
    listStart: o.listStart,
    listPageLength: o.listPageLength,
    listTitle: o.listTitle,
    nextPage: o.nextPage,
    prevPage: o.prevPage,
    toggleSortOrder: o.toggleSortOrder,
    clearTodoList: o.clearTodoList,
    reverse: o.reverse,
    sortById: o.sortById,
    sortByTitle: o.sortByTitle,
    sortByCompletion: o.sortByCompletion,
    setTitle: o.setTitle,
    getItems: o.getItems,
    listToDisplay: o.listToDisplay
  };
};

/**
 * @generated true
 */
export class RTodoList {
  private _state?: ITodoList;
  private _dispatch?: (action: any) => void;
  private _getState?: () => any;
  constructor(
    state?: ITodoList,
    dispatch?: (action: any) => void,
    getState?: () => any
  ) {
    this._state = state;
    this._dispatch = dispatch;
    this._getState = getState;
  }
  get items(): TodoListItem[] | undefined {
    if (this._getState) {
      return this._getState().TodoList.items;
    } else {
      if (this._state) {
        return this._state.items;
      }
    }
    return undefined;
  }
  set items(value: TodoListItem[] | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.items = value;
    } else {
      // dispatch change for item items
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_items, payload: value });
      }
    }
  }
  get state(): TaskState | undefined {
    if (this._getState) {
      return this._getState().TodoList.state;
    } else {
      if (this._state) {
        return this._state.state;
      }
    }
    return undefined;
  }
  set state(value: TaskState | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.state = value;
    } else {
      // dispatch change for item state
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_state, payload: value });
      }
    }
  }
  get stateError(): any | undefined {
    if (this._getState) {
      return this._getState().TodoList.stateError;
    } else {
      if (this._state) {
        return this._state.stateError;
      }
    }
    return undefined;
  }
  set stateError(value: any | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.stateError = value;
    } else {
      // dispatch change for item stateError
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_stateError,
          payload: value
        });
      }
    }
  }
  get sortOrder(): SortOrder | undefined {
    if (this._getState) {
      return this._getState().TodoList.sortOrder;
    } else {
      if (this._state) {
        return this._state.sortOrder;
      }
    }
    return undefined;
  }
  set sortOrder(value: SortOrder | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.sortOrder = value;
    } else {
      // dispatch change for item sortOrder
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_sortOrder,
          payload: value
        });
      }
    }
  }
  get listStart(): number | undefined {
    if (this._getState) {
      return this._getState().TodoList.listStart;
    } else {
      if (this._state) {
        return this._state.listStart;
      }
    }
    return undefined;
  }
  set listStart(value: number | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.listStart = value;
    } else {
      // dispatch change for item listStart
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_listStart,
          payload: value
        });
      }
    }
  }
  get listPageLength(): number | undefined {
    if (this._getState) {
      return this._getState().TodoList.listPageLength;
    } else {
      if (this._state) {
        return this._state.listPageLength;
      }
    }
    return undefined;
  }
  set listPageLength(value: number | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.listPageLength = value;
    } else {
      // dispatch change for item listPageLength
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_listPageLength,
          payload: value
        });
      }
    }
  }
  get listTitle(): string | undefined {
    if (this._getState) {
      return this._getState().TodoList.listTitle;
    } else {
      if (this._state) {
        return this._state.listTitle;
      }
    }
    return undefined;
  }
  set listTitle(value: string | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.listTitle = value;
    } else {
      // dispatch change for item listTitle
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_listTitle,
          payload: value
        });
      }
    }
  }

  nextPage() {
    if (this._state) {
      this.listStart += this.listPageLength;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_nextPage });
      }
    }
  }

  public static nextPage() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).nextPage();
    };
  }
  prevPage() {
    if (this._state) {
      this.listStart -= this.listPageLength;
      if (this.listStart < 0) this.listStart = 0;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_prevPage });
      }
    }
  }

  public static prevPage() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).prevPage();
    };
  }
  toggleSortOrder() {
    if (this._state) {
      this.sortOrder =
        this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_toggleSortOrder });
      }
    }
  }

  public static toggleSortOrder() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).toggleSortOrder();
    };
  }
  clearTodoList() {
    if (this._state) {
      this.items = [];
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_clearTodoList });
      }
    }
  }

  public static clearTodoList() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).clearTodoList();
    };
  }
  reverse() {
    if (this._state) {
      this.items.reverse();
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_reverse });
      }
    }
  }

  public static reverse() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).reverse();
    };
  }
  sortById() {
    if (this._state) {
      this.items.sort((a, b) => a.id - b.id);
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_sortById });
      }
    }
  }

  public static sortById() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).sortById();
    };
  }
  sortByTitle() {
    if (this._state) {
      this.items.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_sortByTitle });
      }
    }
  }

  public static sortByTitle() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).sortByTitle();
    };
  }
  sortByCompletion() {
    if (this._state) {
      const toNumber = (value: boolean): number => (value ? 1 : 0);
      this.items.sort((a, b) => toNumber(a.completed) - toNumber(b.completed));
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_sortByCompletion });
      }
    }
  }

  public static sortByCompletion() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).sortByCompletion();
    };
  }
  setTitle(value: string) {
    if (this._state) {
      this.listTitle = value;
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_setTitle,
          payload: value
        });
      }
    }
  }

  public static setTitle(value: string) {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).setTitle(value);
    };
  }
  /**
   * Fetch items from json placeholder service
   */
  async getItems() {
    if (this.state === "RUNNING") return;
    try {
      this.state = "RUNNING";
      this.items = (await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      )).data;
      this.state = "LOADED";
    } catch (e) {
      this.state = "ERROR";
      this.stateError = e;
    }
  }

  public static getItems() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).getItems();
    };
  }
}

export const TodoListEnums = {
  TodoList_items: "TodoList_items",
  TodoList_state: "TodoList_state",
  TodoList_stateError: "TodoList_stateError",
  TodoList_sortOrder: "TodoList_sortOrder",
  TodoList_listStart: "TodoList_listStart",
  TodoList_listPageLength: "TodoList_listPageLength",
  TodoList_listTitle: "TodoList_listTitle",
  TodoList_nextPage: "TodoList_nextPage",
  TodoList_prevPage: "TodoList_prevPage",
  TodoList_toggleSortOrder: "TodoList_toggleSortOrder",
  TodoList_clearTodoList: "TodoList_clearTodoList",
  TodoList_reverse: "TodoList_reverse",
  TodoList_sortById: "TodoList_sortById",
  TodoList_sortByTitle: "TodoList_sortByTitle",
  TodoList_sortByCompletion: "TodoList_sortByCompletion",
  TodoList_setTitle: "TodoList_setTitle"
};

export const TodoListReducer = (
  state: ITodoList = initTodoList(),
  action: any
) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case TodoListEnums.TodoList_items:
        new RTodoList(draft).items = action.payload;
        break;
      case TodoListEnums.TodoList_state:
        new RTodoList(draft).state = action.payload;
        break;
      case TodoListEnums.TodoList_stateError:
        new RTodoList(draft).stateError = action.payload;
        break;
      case TodoListEnums.TodoList_sortOrder:
        new RTodoList(draft).sortOrder = action.payload;
        break;
      case TodoListEnums.TodoList_listStart:
        new RTodoList(draft).listStart = action.payload;
        break;
      case TodoListEnums.TodoList_listPageLength:
        new RTodoList(draft).listPageLength = action.payload;
        break;
      case TodoListEnums.TodoList_listTitle:
        new RTodoList(draft).listTitle = action.payload;
        break;
      case TodoListEnums.TodoList_nextPage:
        new RTodoList(draft).nextPage();
        break;
      case TodoListEnums.TodoList_prevPage:
        new RTodoList(draft).prevPage();
        break;
      case TodoListEnums.TodoList_toggleSortOrder:
        new RTodoList(draft).toggleSortOrder();
        break;
      case TodoListEnums.TodoList_clearTodoList:
        new RTodoList(draft).clearTodoList();
        break;
      case TodoListEnums.TodoList_reverse:
        new RTodoList(draft).reverse();
        break;
      case TodoListEnums.TodoList_sortById:
        new RTodoList(draft).sortById();
        break;
      case TodoListEnums.TodoList_sortByTitle:
        new RTodoList(draft).sortByTitle();
        break;
      case TodoListEnums.TodoList_sortByCompletion:
        new RTodoList(draft).sortByCompletion();
        break;
      case TodoListEnums.TodoList_setTitle:
        new RTodoList(draft).setTitle(action.payload);
        break;
    }
  });
};
/***************************
 * React Context API test   *
 ***************************/
export const TodoListContext = React.createContext<IProps>(
  initWithMethodsTodoList()
);
export const TodoListConsumer = TodoListContext.Consumer;
let instanceCnt = 1;
export class TodoListProvider extends React.Component {
  public state: ITodoList = initTodoList();
  public lastSetState: ITodoList;
  private __devTools: any = null;
  private __selectorlistToDisplay: any = null;
  constructor(props: any) {
    super(props);
    this.lastSetState = this.state;
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.toggleSortOrder = this.toggleSortOrder.bind(this);
    this.clearTodoList = this.clearTodoList.bind(this);
    this.reverse = this.reverse.bind(this);
    this.sortById = this.sortById.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByCompletion = this.sortByCompletion.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.getItems = this.getItems.bind(this);
    this.__selectorlistToDisplay = listToDisplaySelectorFnCreator();
    const devs = window["devToolsExtension"]
      ? window["devToolsExtension"]
      : null;
    if (devs) {
      this.__devTools = devs.connect({ name: "TodoList" + instanceCnt++ });
      this.__devTools.init(this.state);
      this.__devTools.subscribe((msg: any) => {
        if (msg.type === "DISPATCH" && msg.state) {
          this.setState(JSON.parse(msg.state));
        }
      });
    }
  }
  public componentWillUnmount() {
    if (this.__devTools) {
      this.__devTools.unsubscribe();
    }
  }
  public setStateSync(state: ITodoList) {
    this.lastSetState = state;
    this.setState(state);
  }
  nextPage() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).nextPage()
    );
    if (this.__devTools) {
      this.__devTools.send("nextPage", nextState);
    }
    this.setStateSync(nextState);
  }
  prevPage() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).prevPage()
    );
    if (this.__devTools) {
      this.__devTools.send("prevPage", nextState);
    }
    this.setStateSync(nextState);
  }
  toggleSortOrder() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).toggleSortOrder()
    );
    if (this.__devTools) {
      this.__devTools.send("toggleSortOrder", nextState);
    }
    this.setStateSync(nextState);
  }
  clearTodoList() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).clearTodoList()
    );
    if (this.__devTools) {
      this.__devTools.send("clearTodoList", nextState);
    }
    this.setStateSync(nextState);
  }
  reverse() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).reverse()
    );
    if (this.__devTools) {
      this.__devTools.send("reverse", nextState);
    }
    this.setStateSync(nextState);
  }
  sortById() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).sortById()
    );
    if (this.__devTools) {
      this.__devTools.send("sortById", nextState);
    }
    this.setStateSync(nextState);
  }
  sortByTitle() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).sortByTitle()
    );
    if (this.__devTools) {
      this.__devTools.send("sortByTitle", nextState);
    }
    this.setStateSync(nextState);
  }
  sortByCompletion() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).sortByCompletion()
    );
    if (this.__devTools) {
      this.__devTools.send("sortByCompletion", nextState);
    }
    this.setStateSync(nextState);
  }
  setTitle(value: string) {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).setTitle(value)
    );
    if (this.__devTools) {
      this.__devTools.send("setTitle", nextState);
    }
    this.setStateSync(nextState);
  }
  /**
   * Fetch items from json placeholder service
   */
  async getItems() {
    new RTodoList(
      undefined,
      (action: any) => {
        const nextState = TodoListReducer(this.lastSetState, action);
        if (this.__devTools) {
          this.__devTools.send(action.type, nextState);
        }
        this.setStateSync(nextState);
      },
      () => ({ TodoList: this.lastSetState })
    ).getItems();
  }
  public render() {
    return (
      <TodoListContext.Provider
        value={{
          ...this.state,
          nextPage: this.nextPage,
          prevPage: this.prevPage,
          toggleSortOrder: this.toggleSortOrder,
          clearTodoList: this.clearTodoList,
          reverse: this.reverse,
          sortById: this.sortById,
          sortByTitle: this.sortByTitle,
          sortByCompletion: this.sortByCompletion,
          setTitle: this.setTitle,
          getItems: this.getItems,
          listToDisplay: this.__selectorlistToDisplay(this.state)
        }}
      >
        {" "}
        {this.props.children}
      </TodoListContext.Provider>
    );
  }
}
