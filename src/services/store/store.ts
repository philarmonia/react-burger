import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ingridientsReducer} from "../reducers/Ingridients";
import {ingridientsDetailsReducer} from "../reducers/IngridientsDetails"
import {constructorReducer} from "../reducers/Constructor";
import {orderReducer} from "../reducers/OrderDetails";
import {recoveryReducer} from "../reducers/Recovery";
import {userReducer} from "../reducers/User";
import {wsReducer} from "../reducers/wsReducer";
import {popupReducer} from "../reducers/Popup";
import {socketMiddleware} from "../middleware/socketMiddleware";
import thunk from "redux-thunk";
import { WS_CLOSE_ORDERS_SOCKET, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ORDERS_DATA, WS_SEND_ORDERS } from "../constants";


export const socketTypes = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    wsSendOrders: WS_SEND_ORDERS,
    onMessage: WS_GET_ORDERS_DATA,
    close: WS_CLOSE_ORDERS_SOCKET,
}
export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    ingridientDetails: ingridientsDetailsReducer,
    ingridientsConstructor: constructorReducer,
    orderDetails: orderReducer,
    recovery: recoveryReducer,
    user: userReducer,
    order: wsReducer,
    popup: popupReducer
})


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  interface EventTarget {
    scrollTop: number;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware("wss://norma.nomoreparties.space/orders", socketTypes)
    )
    );
export const store = createStore(rootReducer, enhancer);