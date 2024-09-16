
import {getCookie} from "../../utils/Cookie";
import { WS_CLOSE_ORDERS_SOCKET, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ORDERS_DATA, WS_SEND_ORDERS } from "../constants";
import { TFeedPayload } from "../types/data";

export interface IWsConnectionStart {
    readonly type: typeof  WS_CONNECTION_START
    payload: string;
}
export interface IWsConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSED
}
export interface IWsConnectionSuccess {
    readonly type: typeof  WS_CONNECTION_SUCCESS
}
export interface IWsConnectionError {
    readonly type: typeof  WS_CONNECTION_ERROR
}
export interface IWsGetOrdersData {
    readonly type: typeof  WS_GET_ORDERS_DATA
    payload: TFeedPayload
}
export interface IWsSendOrders{
    readonly type: typeof  WS_SEND_ORDERS
}
export interface IWsCloseOrdersSocket {
    readonly type: typeof WS_CLOSE_ORDERS_SOCKET
}
export type TWebSocketActions = 
    | IWsConnectionStart
    | IWsConnectionClose
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsGetOrdersData
    | IWsSendOrders
    | IWsCloseOrdersSocket;


export const wsConnectionOpen = (): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload: `/all`
    }
}
export const wsConnectionClose = (): IWsConnectionClose => {
    return {
        type: WS_CONNECTION_CLOSED,
    }
}
export const wsConnectionOpenUser = (): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload: `?token=${getCookie("accessToken")}`
    }
}