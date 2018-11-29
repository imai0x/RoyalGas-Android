/***********************************************************************************
 *                                                                                  *
 *   Redux Reducers and React Context API Provider/Consumer for state SimpleModel   *
 *   Generated by ts2redux from Source file ../SimpleModel.ts                       *
 *                                                                                  *
 ***********************************************************************************/

import axios from "axios";

/**
 * @redux true
 */
export class SimpleModel {
  items: any[] = [];
  async getItems() {
    this.items = (await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    )).data;
  }
}

import * as immer from "immer";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";

export interface IContainerPropsMethods {
  getItems: () => any;
}
export interface ISimpleModel {
  items: any[];
}
export const itemsSelectorFn = (state: ISimpleModel): any[] => state.items;

export type IContainerPropsState = ISimpleModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {}
export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    items: state.SimpleModel.items
  };
};
export const mapDispatchToProps = (dispatch: any): IContainerPropsMethods => {
  return {
    getItems: () => {
      return dispatch(RSimpleModel.getItems());
    }
  };
};
export const StateConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const initSimpleModel = () => {
  const o = new SimpleModel();
  return {
    items: o.items
  };
};
const initWithMethodsSimpleModel = () => {
  const o = new SimpleModel();
  return {
    items: o.items,
    getItems: o.getItems
  };
};

/**
 * @generated true
 */
export class RSimpleModel {
  private _state?: ISimpleModel;
  private _dispatch?: (action: any) => void;
  private _getState?: () => any;
  constructor(
    state?: ISimpleModel,
    dispatch?: (action: any) => void,
    getState?: () => any
  ) {
    this._state = state;
    this._dispatch = dispatch;
    this._getState = getState;
  }
  get items(): any[] | undefined {
    if (this._getState) {
      return this._getState().SimpleModel.items;
    } else {
      if (this._state) {
        return this._state.items;
      }
    }
    return undefined;
  }
  set items(value: any[] | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.items = value;
    } else {
      // dispatch change for item items
      if (this._dispatch) {
        this._dispatch({
          type: SimpleModelEnums.SimpleModel_items,
          payload: value
        });
      }
    }
  }

  async getItems() {
    this.items = (await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    )).data;
  }

  public static getItems() {
    return (dispatcher: any, getState: any) => {
      new RSimpleModel(undefined, dispatcher, getState).getItems();
    };
  }
}

export const SimpleModelEnums = {
  SimpleModel_items: "SimpleModel_items"
};

export const SimpleModelReducer = (
  state: ISimpleModel = initSimpleModel(),
  action: any
) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case SimpleModelEnums.SimpleModel_items:
        new RSimpleModel(draft).items = action.payload;
        break;
    }
  });
};
/***************************
 * React Context API test   *
 ***************************/
export const SimpleModelContext = React.createContext<IProps>(
  initWithMethodsSimpleModel()
);
export const SimpleModelConsumer = SimpleModelContext.Consumer;
let instanceCnt = 1;
export class SimpleModelProvider extends React.Component {
  public state: ISimpleModel = initSimpleModel();
  public lastSetState: ISimpleModel;
  private __devTools: any = null;
  constructor(props: any) {
    super(props);
    this.lastSetState = this.state;
    this.getItems = this.getItems.bind(this);
    const devs = window["devToolsExtension"]
      ? window["devToolsExtension"]
      : null;
    if (devs) {
      this.__devTools = devs.connect({ name: "SimpleModel" + instanceCnt++ });
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
  public setStateSync(state: ISimpleModel) {
    this.lastSetState = state;
    this.setState(state);
  }
  async getItems() {
    new RSimpleModel(
      undefined,
      (action: any) => {
        const nextState = SimpleModelReducer(this.lastSetState, action);
        if (this.__devTools) {
          this.__devTools.send(action.type, nextState);
        }
        this.setStateSync(nextState);
      },
      () => ({ SimpleModel: this.lastSetState })
    ).getItems();
  }
  public render() {
    return (
      <SimpleModelContext.Provider
        value={{ ...this.state, getItems: this.getItems }}
      >
        {" "}
        {this.props.children}
      </SimpleModelContext.Provider>
    );
  }
}
