"use strict";
/*********************************************************************************
 *                                                                                *
 *   Redux Reducers and React Context API Provider/Consumer for state WaspModel   *
 *   Generated by ts2redux from Source file ../WaspModel.ts                       *
 *                                                                                *
 *********************************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @redux true
 */
var WaspModel = /** @class */ (function () {
    function WaspModel() {
        this.speed = 10;
        this.lastId = 1;
        this.wasps = {};
    }
    WaspModel.prototype.addWasp = function (pos) {
        var o = { x: 0, y: 0 };
        o.id = this.lastId++;
        o.x = pos.x;
        o.y = pos.y;
        o.dx = 1 - 2 * Math.random();
        o.dy = 1 - 2 * Math.random();
        o.color = "red";
        this.wasps[o.id] = o;
    };
    WaspModel.prototype.incSpeed = function (value) {
        this.speed = this.speed + value;
    };
    WaspModel.prototype.setColor = function (value) {
        if (this.wasps[value.waspId])
            this.wasps[value.waspId].color = value.colorValue;
    };
    WaspModel.prototype.step = function () {
        var _this = this;
        var list = Object.keys(this.wasps).map(function (i) { return _this.wasps[i]; });
        if (list.length === 0) {
            return;
        }
        var center = list.reduce(function (prev, curr) {
            return {
                x: prev.x + curr.x,
                y: prev.y + curr.y
            };
        }, { x: 0, y: 0 });
        center.x = center.x / list.length;
        center.y = center.y / list.length;
        for (var _i = 0, _a = Object.keys(this.wasps); _i < _a.length; _i++) {
            var key = _a[_i];
            var wasp = this.wasps[key];
            var x = center.x - wasp.x;
            var y = center.y - wasp.y;
            var len = Math.sqrt(x * x + y * y);
            if (len > 20) {
                wasp.dx += x / len;
                wasp.dy += y / len;
            }
            wasp.steps = 0;
            wasp.x += wasp.dx;
            wasp.y += wasp.dy;
            if (wasp.x < 0 || wasp.x > 300)
                wasp.dx = wasp.dx * -1;
            if (wasp.y < 0 || wasp.y > 300)
                wasp.dy = wasp.dy * -1;
            wasp.steps++;
        }
    };
    return WaspModel;
}());
var immer = require("immer");
var react_redux_1 = require("react-redux");
var React = require("react");
exports.speedSelectorFn = function (state) { return state.speed; };
exports.lastIdSelectorFn = function (state) { return state.lastId; };
exports.waspsSelectorFn = function (state) { return state.wasps; };
exports.mapStateToProps = function (state) {
    return {
        speed: state.WaspModel.speed,
        lastId: state.WaspModel.lastId,
        wasps: state.WaspModel.wasps
    };
};
exports.mapDispatchToProps = function (dispatch) {
    return {
        addWasp: function (pos) {
            return dispatch(RWaspModel.addWasp(pos));
        },
        incSpeed: function (value) {
            return dispatch(RWaspModel.incSpeed(value));
        },
        setColor: function (value) {
            return dispatch(RWaspModel.setColor(value));
        },
        step: function () {
            return dispatch(RWaspModel.step());
        }
    };
};
exports.StateConnector = react_redux_1.connect(exports.mapStateToProps, exports.mapDispatchToProps);
var initWaspModel = function () {
    var o = new WaspModel();
    return {
        speed: o.speed,
        lastId: o.lastId,
        wasps: o.wasps
    };
};
var initWithMethodsWaspModel = function () {
    var o = new WaspModel();
    return {
        speed: o.speed,
        lastId: o.lastId,
        wasps: o.wasps,
        addWasp: o.addWasp,
        incSpeed: o.incSpeed,
        setColor: o.setColor,
        step: o.step
    };
};
/**
 * @generated true
 */
var RWaspModel = /** @class */ (function () {
    function RWaspModel(state, dispatch, getState) {
        this._state = state;
        this._dispatch = dispatch;
        this._getState = getState;
    }
    Object.defineProperty(RWaspModel.prototype, "speed", {
        get: function () {
            if (this._getState) {
                return this._getState().WaspModel.speed;
            }
            else {
                if (this._state) {
                    return this._state.speed;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && typeof value !== "undefined") {
                this._state.speed = value;
            }
            else {
                // dispatch change for item speed
                if (this._dispatch) {
                    this._dispatch({
                        type: exports.WaspModelEnums.WaspModel_speed,
                        payload: value
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RWaspModel.prototype, "lastId", {
        get: function () {
            if (this._getState) {
                return this._getState().WaspModel.lastId;
            }
            else {
                if (this._state) {
                    return this._state.lastId;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && typeof value !== "undefined") {
                this._state.lastId = value;
            }
            else {
                // dispatch change for item lastId
                if (this._dispatch) {
                    this._dispatch({
                        type: exports.WaspModelEnums.WaspModel_lastId,
                        payload: value
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RWaspModel.prototype, "wasps", {
        get: function () {
            if (this._getState) {
                return this._getState().WaspModel.wasps;
            }
            else {
                if (this._state) {
                    return this._state.wasps;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && typeof value !== "undefined") {
                this._state.wasps = value;
            }
            else {
                // dispatch change for item wasps
                if (this._dispatch) {
                    this._dispatch({
                        type: exports.WaspModelEnums.WaspModel_wasps,
                        payload: value
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    RWaspModel.prototype.addWasp = function (pos) {
        if (this._state) {
            var o = { x: 0, y: 0 };
            o.id = this.lastId++;
            o.x = pos.x;
            o.y = pos.y;
            o.dx = 1 - 2 * Math.random();
            o.dy = 1 - 2 * Math.random();
            o.color = "red";
            this.wasps[o.id] = o;
        }
        else {
            if (this._dispatch) {
                this._dispatch({
                    type: exports.WaspModelEnums.WaspModel_addWasp,
                    payload: pos
                });
            }
        }
    };
    RWaspModel.addWasp = function (pos) {
        return function (dispatcher, getState) {
            new RWaspModel(undefined, dispatcher, getState).addWasp(pos);
        };
    };
    RWaspModel.prototype.incSpeed = function (value) {
        if (this._state) {
            this.speed = this.speed + value;
        }
        else {
            if (this._dispatch) {
                this._dispatch({
                    type: exports.WaspModelEnums.WaspModel_incSpeed,
                    payload: value
                });
            }
        }
    };
    RWaspModel.incSpeed = function (value) {
        return function (dispatcher, getState) {
            new RWaspModel(undefined, dispatcher, getState).incSpeed(value);
        };
    };
    RWaspModel.prototype.setColor = function (value) {
        if (this._state) {
            if (this.wasps[value.waspId])
                this.wasps[value.waspId].color = value.colorValue;
        }
        else {
            if (this._dispatch) {
                this._dispatch({
                    type: exports.WaspModelEnums.WaspModel_setColor,
                    payload: value
                });
            }
        }
    };
    RWaspModel.setColor = function (value) {
        return function (dispatcher, getState) {
            new RWaspModel(undefined, dispatcher, getState).setColor(value);
        };
    };
    RWaspModel.prototype.step = function () {
        var _this = this;
        if (this._state) {
            var list = Object.keys(this.wasps).map(function (i) { return _this.wasps[i]; });
            if (list.length === 0) {
                return;
            }
            var center = list.reduce(function (prev, curr) {
                return {
                    x: prev.x + curr.x,
                    y: prev.y + curr.y
                };
            }, { x: 0, y: 0 });
            center.x = center.x / list.length;
            center.y = center.y / list.length;
            for (var _i = 0, _a = Object.keys(this.wasps); _i < _a.length; _i++) {
                var key = _a[_i];
                var wasp = this.wasps[key];
                var x = center.x - wasp.x;
                var y = center.y - wasp.y;
                var len = Math.sqrt(x * x + y * y);
                if (len > 20) {
                    wasp.dx += x / len;
                    wasp.dy += y / len;
                }
                wasp.steps = 0;
                wasp.x += wasp.dx;
                wasp.y += wasp.dy;
                if (wasp.x < 0 || wasp.x > 300)
                    wasp.dx = wasp.dx * -1;
                if (wasp.y < 0 || wasp.y > 300)
                    wasp.dy = wasp.dy * -1;
                wasp.steps++;
            }
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.WaspModelEnums.WaspModel_step });
            }
        }
    };
    RWaspModel.step = function () {
        return function (dispatcher, getState) {
            new RWaspModel(undefined, dispatcher, getState).step();
        };
    };
    return RWaspModel;
}());
exports.RWaspModel = RWaspModel;
exports.WaspModelEnums = {
    WaspModel_speed: "WaspModel_speed",
    WaspModel_lastId: "WaspModel_lastId",
    WaspModel_wasps: "WaspModel_wasps",
    WaspModel_addWasp: "WaspModel_addWasp",
    WaspModel_incSpeed: "WaspModel_incSpeed",
    WaspModel_setColor: "WaspModel_setColor",
    WaspModel_step: "WaspModel_step"
};
exports.WaspModelReducer = function (state, action) {
    if (state === void 0) { state = initWaspModel(); }
    return immer.produce(state, function (draft) {
        switch (action.type) {
            case exports.WaspModelEnums.WaspModel_speed:
                new RWaspModel(draft).speed = action.payload;
                break;
            case exports.WaspModelEnums.WaspModel_lastId:
                new RWaspModel(draft).lastId = action.payload;
                break;
            case exports.WaspModelEnums.WaspModel_wasps:
                new RWaspModel(draft).wasps = action.payload;
                break;
            case exports.WaspModelEnums.WaspModel_addWasp:
                new RWaspModel(draft).addWasp(action.payload);
                break;
            case exports.WaspModelEnums.WaspModel_incSpeed:
                new RWaspModel(draft).incSpeed(action.payload);
                break;
            case exports.WaspModelEnums.WaspModel_setColor:
                new RWaspModel(draft).setColor(action.payload);
                break;
            case exports.WaspModelEnums.WaspModel_step:
                new RWaspModel(draft).step();
                break;
        }
    });
};
/***************************
 * React Context API test   *
 ***************************/
exports.WaspModelContext = React.createContext(initWithMethodsWaspModel());
exports.WaspModelConsumer = exports.WaspModelContext.Consumer;
var instanceCnt = 1;
var WaspModelProvider = /** @class */ (function (_super) {
    __extends(WaspModelProvider, _super);
    function WaspModelProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initWaspModel();
        _this.__devTools = null;
        _this.lastSetState = _this.state;
        _this.addWasp = _this.addWasp.bind(_this);
        _this.incSpeed = _this.incSpeed.bind(_this);
        _this.setColor = _this.setColor.bind(_this);
        _this.step = _this.step.bind(_this);
        var devs = window["devToolsExtension"]
            ? window["devToolsExtension"]
            : null;
        if (devs) {
            _this.__devTools = devs.connect({ name: "WaspModel" + instanceCnt++ });
            _this.__devTools.init(_this.state);
            _this.__devTools.subscribe(function (msg) {
                if (msg.type === "DISPATCH" && msg.state) {
                    _this.setState(JSON.parse(msg.state));
                }
            });
        }
        return _this;
    }
    WaspModelProvider.prototype.componentWillUnmount = function () {
        if (this.__devTools) {
            this.__devTools.unsubscribe();
        }
    };
    WaspModelProvider.prototype.setStateSync = function (state) {
        this.lastSetState = state;
        this.setState(state);
    };
    WaspModelProvider.prototype.addWasp = function (pos) {
        var nextState = immer.produce(this.state, function (draft) {
            return new RWaspModel(draft).addWasp(pos);
        });
        if (this.__devTools) {
            this.__devTools.send("addWasp", nextState);
        }
        this.setStateSync(nextState);
    };
    WaspModelProvider.prototype.incSpeed = function (value) {
        var nextState = immer.produce(this.state, function (draft) {
            return new RWaspModel(draft).incSpeed(value);
        });
        if (this.__devTools) {
            this.__devTools.send("incSpeed", nextState);
        }
        this.setStateSync(nextState);
    };
    WaspModelProvider.prototype.setColor = function (value) {
        var nextState = immer.produce(this.state, function (draft) {
            return new RWaspModel(draft).setColor(value);
        });
        if (this.__devTools) {
            this.__devTools.send("setColor", nextState);
        }
        this.setStateSync(nextState);
    };
    WaspModelProvider.prototype.step = function () {
        var nextState = immer.produce(this.state, function (draft) {
            return new RWaspModel(draft).step();
        });
        if (this.__devTools) {
            this.__devTools.send("step", nextState);
        }
        this.setStateSync(nextState);
    };
    WaspModelProvider.prototype.render = function () {
        return (React.createElement(exports.WaspModelContext.Provider, { value: __assign({}, this.state, { addWasp: this.addWasp, incSpeed: this.incSpeed, setColor: this.setColor, step: this.step }) },
            " ",
            this.props.children));
    };
    return WaspModelProvider;
}(React.Component));
exports.WaspModelProvider = WaspModelProvider;
//# sourceMappingURL=WaspModel.js.map