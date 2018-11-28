/*************************************************************************************
 *                                                                                    *
 *   Redux Reducers and React Context API Provider/Consumer for state UIHelperModel   *
 *   Generated by ts2redux from Source file ../UIHelper.ts                            *
 *                                                                                    *
 *************************************************************************************/
import { IState } from "./index";
import * as React from "react";
export interface IContainerPropsMethods {
    toggle: () => any;
}
export interface IUIHelperModel {
    showWasps: Boolean;
}
export declare const showWaspsSelectorFn: (state: IUIHelperModel) => Boolean;
export declare type IContainerPropsState = IUIHelperModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {
}
export declare const mapStateToProps: (state: IState) => IUIHelperModel;
export declare const mapDispatchToProps: (dispatch: any) => IContainerPropsMethods;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RUIHelperModel {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: IUIHelperModel, dispatch?: (action: any) => void, getState?: () => any);
    showWasps: Boolean | undefined;
    toggle(): void;
    static toggle(): (dispatcher: any, getState: any) => void;
}
export declare const UIHelperModelEnums: {
    UIHelperModel_showWasps: string;
    UIHelperModel_toggle: string;
};
export declare const UIHelperModelReducer: (state: IUIHelperModel, action: any) => IUIHelperModel;
/***************************
 * React Context API test   *
 ***************************/
export declare const UIHelperModelContext: React.Context<IProps>;
export declare const UIHelperModelConsumer: React.ExoticComponent<React.ConsumerProps<IProps>>;
export declare class UIHelperModelProvider extends React.Component {
    state: IUIHelperModel;
    lastSetState: IUIHelperModel;
    private __devTools;
    constructor(props: any);
    componentWillUnmount(): void;
    setStateSync(state: IUIHelperModel): void;
    toggle(): void;
    render(): JSX.Element;
}