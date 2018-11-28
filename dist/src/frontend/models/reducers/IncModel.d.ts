/********************************************************************************
 *                                                                               *
 *   Redux Reducers and React Context API Provider/Consumer for state IncModel   *
 *   Generated by ts2redux from Source file ../IncModel.ts                       *
 *                                                                               *
 ********************************************************************************/
export declare class IncModel {
    cnt: number;
    increment(): void;
    decrement(): void;
}
import { IState } from "./index";
import * as React from "react";
export interface IContainerPropsMethods {
    increment: () => any;
    decrement: () => any;
}
export interface IIncModel {
    cnt: number;
}
export declare const cntSelectorFn: (state: IIncModel) => number;
export declare type IContainerPropsState = IIncModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {
}
export declare const mapStateToProps: (state: IState) => IIncModel;
export declare const mapDispatchToProps: (dispatch: any) => IContainerPropsMethods;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RIncModel {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: IIncModel, dispatch?: (action: any) => void, getState?: () => any);
    cnt: number | undefined;
    increment(): void;
    static increment(): (dispatcher: any, getState: any) => void;
    decrement(): void;
    static decrement(): (dispatcher: any, getState: any) => void;
}
export declare const IncModelEnums: {
    IncModel_cnt: string;
    IncModel_increment: string;
    IncModel_decrement: string;
};
export declare const IncModelReducer: (state: IIncModel, action: any) => IIncModel;
/***************************
 * React Context API test   *
 ***************************/
export declare const IncModelContext: React.Context<IProps>;
export declare const IncModelConsumer: React.ExoticComponent<React.ConsumerProps<IProps>>;
export declare class IncModelProvider extends React.Component {
    state: IIncModel;
    lastSetState: IIncModel;
    private __devTools;
    constructor(props: any);
    componentWillUnmount(): void;
    setStateSync(state: IIncModel): void;
    increment(): void;
    decrement(): void;
    render(): JSX.Element;
}
