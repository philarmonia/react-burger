import {forgotPasswordAPI, resetPasswordAPI} from "../../utils/Api";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constants";
import { AppDispatch } from "../types";
import { TUser } from "../types/data";

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST
}
export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
    user: TUser;
    message: string;
}
export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED
}
export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST
}
export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS
    message: ''
}
export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED
}
export type TRecoveryActions = 
| IForgotPasswordRequest
| IForgotPasswordSuccess
| IForgotPasswordFailed
| IResetPasswordRequest
| IResetPasswordSuccess
| IResetPasswordFailed;

export const forgotPassword = (email: string) => {
    return function dispatch(dispatch: AppDispatch){
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })
        forgotPasswordAPI(email)
        .then(data => {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                user: data.user,
                message: data.message
            })
        })
        .catch(() => {
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            })
        })
    }
}

export const resetPassword = (password: string, token: string) => {
    return function dispatch(dispatch: AppDispatch){
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
        resetPasswordAPI(password, token)
        .then(data => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                message: data.message
            })
        })
        .catch(() => {
            dispatch({
                type: RESET_PASSWORD_FAILED
            })
        })
    }
}