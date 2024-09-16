import { TPopupActions } from "../actions/Popup";
import { SET_POPUP_ACITVE, SET_POPUP_CLOSE } from "../constants";

type TPopupState = {
    popup: boolean;
}

const initialState: TPopupState = { popup: false };

export const popupReducer = (state = initialState, action: TPopupActions): TPopupState => {
    switch (action.type) {
        case SET_POPUP_ACITVE: {
            return { popup: true };
        }
        case SET_POPUP_CLOSE: {
            return { popup: false };
        }
        default:
            return state;
    }
};