import {getIngridientsAPI} from "../../utils/Api";
import {TIngridient} from "../types/data";
import {AppDispatch, AppThunk} from "../types";
import { INGRIDIENTS_FAILED, INGRIDIENTS_REQUEST, INGRIDIENTS_SUCCESS } from "../constants";

export interface IIngridientRequest {
    readonly type: typeof INGRIDIENTS_REQUEST;
}

export interface IIngridientSuccess {
    readonly type: typeof INGRIDIENTS_SUCCESS;
    ingridients: TIngridient[]
}

export interface IIngridientFailed {
    readonly type: typeof INGRIDIENTS_FAILED;
}

export type TIngrdieintsActions =
    | IIngridientRequest
    | IIngridientSuccess
    | IIngridientFailed;

export const getIngridients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: INGRIDIENTS_REQUEST
        });
        getIngridientsAPI()
            .then((data) => {
                dispatch({
                    type: INGRIDIENTS_SUCCESS,
                    ingridients: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: INGRIDIENTS_FAILED
                });
            })
    }
}
