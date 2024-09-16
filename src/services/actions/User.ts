import {getProfileAPI, loginAPI, patchProfileAPI, registerAPI, logoutAPI, updateTokenAPI,} from "../../utils/Api";
import {setCookie, deleteCookie, getCookie} from "../../utils/Cookie";
import { REGISTER_FORM_REQUEST, REGISTER_FORM_SUCCESS, REGISTER_FORM_FAILED, LOGIN_FORM_REQUEST, LOGIN_FORM_SUCCESS, LOGIN_FORM_FAILED, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILED, PATCH_PROFILE_REQUEST, PATCH_PROFILE_SUCCESS, PATCH_PROFILE_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../constants";
import { AppDispatch } from "../types";
import { TUser } from "../types/data";

export type TUserActions = 
| ILoginRequest
| ILoginSuccess
| ILoginFailed
| IRegisterRequest
| IRegisterSuccess
| IRegisterFailed
| IGetProfileRequest
| IGetProfileSuccess
| IGetProfileFailed
| IPatchProfileRequest
| IPatchProfileSuccess
| IPatchProfileFailed
| ILogoutRequest
| ILogoutSuccess;
 ;

interface IRegisterRequest {
    type: typeof REGISTER_FORM_REQUEST;
}

interface IRegisterSuccess {
    type: typeof REGISTER_FORM_SUCCESS;
    user: TUser;
}

interface IRegisterFailed {
    type: typeof REGISTER_FORM_FAILED;
}


interface ILoginRequest {
    readonly type: typeof LOGIN_FORM_REQUEST;
}

interface ILoginSuccess {
    readonly type: typeof LOGIN_FORM_SUCCESS;
    user: TUser
}

interface ILoginFailed {
    readonly type: typeof LOGIN_FORM_FAILED;
}

interface IGetProfileRequest {
    type: typeof GET_PROFILE_REQUEST;
  }
  
  interface IGetProfileSuccess {
    type: typeof GET_PROFILE_SUCCESS;
    user: TUser;
  }
  
  interface IGetProfileFailed {
    type: typeof GET_PROFILE_FAILED;
  }
  


interface IPatchProfileRequest {
    type: typeof PATCH_PROFILE_REQUEST;
  }
  
  interface IPatchProfileSuccess {
    type: typeof PATCH_PROFILE_SUCCESS;
    user: TUser;
  }
  
  interface IPatchProfileFailed {
    type: typeof PATCH_PROFILE_FAILED;
  }
  

interface ILogoutRequest {
    type: typeof LOGOUT_REQUEST;
  }
  
  interface ILogoutSuccess {
    type: typeof LOGOUT_SUCCESS;
  }
  

export const register = (email: string, password: string, name: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: REGISTER_FORM_REQUEST
        })
        registerAPI(email, password, name)
            .then(data => {
                setCookie("accessToken", data.accessToken.split("Bearer ")[1])
                setCookie("refreshToken", data.refreshToken)
                dispatch({
                    type: REGISTER_FORM_SUCCESS,
                    user: data.user
                })
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_FORM_FAILED
                })
            })
    }
};
export const login = (email: string, password: string) => {
    return function dispatch(dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_FORM_REQUEST
        })
        loginAPI(email, password)
            .then(data => {
                setCookie("accessToken", data.accessToken.split("Bearer ")[1])
                setCookie("refreshToken", data.refreshToken)
                dispatch({
                    type: LOGIN_FORM_SUCCESS,
                    user: data.user
                })
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_FORM_FAILED
                })
            })
    }
}
export const getProfile = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_PROFILE_REQUEST
        })
        getProfileAPI()
            .then((data) => {
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    user: data.user
                })
            })
             .catch((error) => {
                 if(error) {
                     const refreshToken = getCookie("refreshToken")
                    updateTokenAPI(refreshToken)
                    .then((data) => dispatch({
                        type: GET_PROFILE_SUCCESS,
                        user: data.user
                    }))
                }
                else {
                    dispatch({
                        type: GET_PROFILE_FAILED
                    })
                }
             })
    }
}
export const patchProfile = (email: string, name: string, password: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: PATCH_PROFILE_REQUEST
        })
        patchProfileAPI(email, name, password)
            .then((data) => {
                dispatch({
                    type: PATCH_PROFILE_SUCCESS,
                    user: data.user
                })
            })
             .catch((error) => {
                 if(error) {
                     const refreshToken = getCookie("refreshToken")
                    updateTokenAPI(refreshToken)
                    .then((data) => {
                        dispatch({
                            type: PATCH_PROFILE_SUCCESS,
                            user: data.user
                        })
                    })
                }
                else {
                    dispatch({
                        type: PATCH_PROFILE_FAILED
                    })
                }
             })
    }
}
export const logout = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        })
        logoutAPI(getCookie("refreshToken")).then(() => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
        })
    }
}
