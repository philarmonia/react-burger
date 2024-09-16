import { TMiddlewareActions } from "../types/data";
import { Middleware } from "redux";

export const socketMiddleware = (wsUrl: string, wsActions: TMiddlewareActions): Middleware => {
    return store => {
        let socket: null | WebSocket = null;
        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onClose, onError, onMessage, close} = wsActions;
            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const message = JSON.parse(event.data);
                    if (message.success) {
                        dispatch({type: onMessage, payload: message})
                    }
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

            }
            if (type === close) {
               socket && socket.close();
            }

            next(action);
        };
    };
};