
import { TIngrdieintsActions } from "../actions/Ingridients";
import { INGRIDIENTS_FAILED, INGRIDIENTS_REQUEST, INGRIDIENTS_SUCCESS } from "../constants";
import {TIngridient} from "../types/data";

type TIngridientsState = {
    ingridients: TIngridient[];
    ingridientsFailed: boolean;
    ingridientsRequest: boolean;
};
const initialState: TIngridientsState = {
    ingridients: [],
    ingridientsFailed: false,
    ingridientsRequest: false
}
export const ingridientsReducer = (state = initialState, action: TIngrdieintsActions): TIngridientsState => {
    switch(action.type) {
        case INGRIDIENTS_REQUEST: {
            return {
                ...state,
                ingridientsRequest: true,
                ingridientsFailed: false
            }
        }
        case INGRIDIENTS_SUCCESS: {
            return {
                ...state,
                ingridientsRequest: false,
                ingridientsFailed: false,
                ingridients: action.ingridients
            }
        }
        case INGRIDIENTS_FAILED: {
            return {
                ...state,
                ingridientsRequest: false,
                ingridientsFailed: true
            }
        }
        default:
            return state
    }
}