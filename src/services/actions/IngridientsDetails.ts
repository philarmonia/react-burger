import { AppDispatch } from "../types";
import { TIngridient } from "../types/data";

export const OPEN_INGRIDIENT_REQUEST: 'OPEN_INGRIDIENT_REQUEST' = 'OPEN_INGRIDIENT_REQUEST';
export const OPEN_INGRIDIENT_SUCCESS: 'OPEN_INGRIDIENT_SUCCESS' = 'OPEN_INGRIDIENT_SUCCESS';
export const CLOSE_INGRIDIENT: 'CLOSE_INGRIDIENT' = 'CLOSE_INGRIDIENT';
export interface IIngridientDetailsRequest  {
    readonly type: typeof OPEN_INGRIDIENT_REQUEST
}

export interface IIngridientDetailsSuccess  {
    readonly type: typeof OPEN_INGRIDIENT_SUCCESS
    ingridient: TIngridient
}

export interface IIngridientDetailsClose  {
    readonly type: typeof CLOSE_INGRIDIENT
}

export type TIngridientDetailsActions = 
     | IIngridientDetailsRequest
     | IIngridientDetailsSuccess
     | IIngridientDetailsClose;

export const getIngridientDetails = (ingridient: TIngridient) => {
    return function (dispatch: AppDispatch) {
        dispatch({type: OPEN_INGRIDIENT_REQUEST})
        dispatch({
            type: OPEN_INGRIDIENT_SUCCESS,
            ingridient: ingridient
        })
    }
}
export const closeIngridientDetails = () => {
    return {
        type: CLOSE_INGRIDIENT
    }
}