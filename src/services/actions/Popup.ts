import { SET_POPUP_ACITVE, SET_POPUP_CLOSE } from "../constants";


export interface ISetPopupAcitve {
    type: typeof SET_POPUP_ACITVE
}
export interface ISetPopupClose {
    type: typeof SET_POPUP_CLOSE
}
export type TPopupActions = ISetPopupAcitve | ISetPopupClose