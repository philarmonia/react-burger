import { TConstructorActions } from "../actions/Constructor";
import { ADD_BUN, ADD_INGRIDIENT, DELETE_INGRIDIENT, MOVE_INGRIDIENT } from "../constants";
import { TIngridient } from "../types/data";

type TIngridientsState = {
    ingridients: TIngridient[];
    bun: TIngridient
};
const initialState: TIngridientsState = {
    ingridients: [],
    bun: {
        _id: '',
        __v: 0,
        name: '',
        type: "bun",
        image: '',
        price: 0,
        fat: 0,
        proteins: 0,
        carbohydrates: 0,
        calories: 0,
        image_mobile: '',
        image_large: '',
        uuid: '',
        length: 0,
}
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TIngridientsState => {
    switch (action.type) {
        case ADD_INGRIDIENT: {
            return {
                ...state,
                ingridients: [...state.ingridients, action.data]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.data,
                ingridients: [...state.ingridients, action.data]
            }
        }
        case MOVE_INGRIDIENT: {
            const movedIngridients = [...state.ingridients];
            movedIngridients.splice(
                action.data.dragIndex,0,
                movedIngridients.splice(action.data.hoverIndex,1)[0]
            );
            return {
                ...state,
                ingridients: movedIngridients
            }
        }
        case DELETE_INGRIDIENT: {
            return {
                ...state,
                ingridients: [...state.ingridients].filter(item => item.uuid !== action.uuid)
            }
        }
        default:
            return state;
    }
}