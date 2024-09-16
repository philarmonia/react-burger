export type TIngridient = {
    _id: string;
    __v: number;
    name: string;
    type: string;
    image: string;
    price:number;
    fat: number;
    proteins: number;
    carbohydrates: number;
    calories: number;
    image_mobile: string;
    image_large: string;
    uuid: string;
    length?: number;
    index?: number;
    dragIndex?: number;
    hoverIndex?: number;
}

export type TUser = {
    email: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export type TModal = {
    children?: JSX.Element;
    closePopup: () => void;
}

export type TModalOverlay = {
    closePopup: () => void;
}

export type TFeedOrder = {
    _id: string;
    ingredients: string[];
    createdAt: string;
    number: number;
    status: string;
    updatedAt: string;
    name: string;
}
export type TFeedPayload = {
    orders: TFeedOrder[];
    totalToday: number;
    total: number;
}
export type TMiddlewareActions = {
    wsInit: string;
    onOpen: string; 
    onClose: string; 
    onError: string;
    onMessage: string;
    close: string;
}