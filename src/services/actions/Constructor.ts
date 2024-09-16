import { ADD_BUN, ADD_INGRIDIENT, DELETE_INGRIDIENT, MOVE_INGRIDIENT } from "../constants";
import {AppDispatch} from "../types";
import {TIngridient} from "../types/data";

export interface IAddIngridient {
    readonly type: typeof ADD_INGRIDIENT
    data: TIngridient
}

export interface IAddBun {
    readonly type: typeof ADD_BUN
    data: TIngridient
    bun: TIngridient
}

export interface IMoveIngridient {
    readonly type: typeof MOVE_INGRIDIENT
    data: {
        dragIndex: number;
        hoverIndex: number;
    }
}

export interface IDeleteIngridient {
    readonly type: typeof DELETE_INGRIDIENT
    uuid: string;
}

export type TConstructorActions =
    | IAddIngridient
    | IAddBun
    | IMoveIngridient
    | IDeleteIngridient

export const moveIngridients = (dragIndex: number, hoverIndex: number, ingridients: TIngridient[]) => {
    return function(dispatch: AppDispatch) {
        const dragItem = ingridients[dragIndex];
        const hoverItem = ingridients[hoverIndex];
        const movedIngridients = [...ingridients];
        movedIngridients[dragIndex] = hoverItem;
        movedIngridients[hoverIndex] = dragItem;
        dispatch({type: MOVE_INGRIDIENT, data: {dragIndex, hoverIndex}})
    }
}