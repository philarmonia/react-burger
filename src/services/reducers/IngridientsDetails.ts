
import { TIngridientDetailsActions } from "../actions/IngridientsDetails";
import { CLOSE_INGRIDIENT, OPEN_INGRIDIENT_REQUEST, OPEN_INGRIDIENT_SUCCESS } from "../constants";
import { TIngridient } from "../types/data";

export type TIngridientDetailsState = {
    ingridient: TIngridient | null,
    openIngridientRequest: boolean,
    openIngridientFailed: boolean
}
const initialState = {
    ingridient: null,
    openIngridientRequest: false,
    openIngridientFailed: false
}

export const ingridientsDetailsReducer = (state = initialState, action: TIngridientDetailsActions): TIngridientDetailsState => {
    switch (action.type) {
        case OPEN_INGRIDIENT_REQUEST:
            return {
                ...state,
                openIngridientRequest: true,
                openIngridientFailed: false
            }
        case OPEN_INGRIDIENT_SUCCESS:
            return {
                ...state,
                openIngridientRequest: false,
                openIngridientFailed: false,
                ingridient: action.ingridient
            }
        case CLOSE_INGRIDIENT:
            return {
                ...state,
                ingridient: null,
                openIngridientRequest: false,
                openIngridientFailed: false
            }

        default:
            return state
    }
}