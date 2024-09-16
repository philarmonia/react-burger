import { getCookie, setCookie } from "./Cookie";

const BASE_URL = "https://norma.nomoreparties.space/api";

export const API: {
    ingridients: string;
    order: string;
    forgotPassword: string;
    resetPassword: string;
    register: string;
    login: string;
    profile: string;
    logout: string;
    token: string;
} = {
    ingridients: `${BASE_URL}/ingredients`,
    order: `${BASE_URL}/orders`,
    forgotPassword: `${BASE_URL}/password-reset`,
    resetPassword: `${BASE_URL}/password-reset/reset`,
    register: `${BASE_URL}/auth/register`,
    login: `${BASE_URL}/auth/login`,
    profile: `${BASE_URL}/auth/user`,
    logout: `${BASE_URL}/auth/logout`,
    token: `${BASE_URL}/auth/token`,
};

export const checkResult = (result: Response): Promise<any> => {
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
};

export const getIngridientsAPI = async (): Promise<any> => {
    return await fetch(API.ingridients, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((data) => checkResult(data));
};

export const getOrderAPI = async (ingridientsId: string[]): Promise<any> => {
    return await fetch(API.order, {
        method: 'POST',
        body: JSON.stringify({
            ingredients: ingridientsId,
        }),
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getCookie("accessToken")}`,
        },
    }).then((data) => checkResult(data));
};

export const forgotPasswordAPI = async (email: string): Promise<any> => {
    return await fetch(API.forgotPassword, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    }).then((data) => checkResult(data));
};

export const resetPasswordAPI = async (password: string, token: string): Promise<any> => {
    return await fetch(API.resetPassword, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, token}),
    }).then((data) => checkResult(data));
};

export const registerAPI = async (name: string, email: string, password: string): Promise<any> => {
    return await fetch(API.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
    }).then((data) => checkResult(data));
};

export const loginAPI = async (email: string, password: string): Promise<any> => {
    return await fetch(API.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    }).then((data) => checkResult(data));
};

export const getProfileAPI = async (): Promise<any> => {
    return await fetch(API.profile, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getCookie("accessToken")}`,
        },
    })
        .then((data) => checkResult(data));
}

export const patchProfileAPI = async (name: string, email: string, password: string): Promise<any> => {
    return await fetch(API.profile, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify({name, email, password}),
    })
        .then((data) => checkResult(data));
}

export const logoutAPI = async (refreshToken: string | undefined): Promise<any> => {
    return await fetch(API.logout, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken }),
    })
    .then((data) => checkResult(data))
}
export const updateTokenAPI = async (refreshToken: string | undefined): Promise<any> => {
    return await fetch(API.token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken }),
    }).then((data) => checkResult(data))
    .then((data) => {
        if (data.accessToken) {
            setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
        }
        if (data.refreshToken) {
            setCookie("refreshToken", data.refreshToken);
        }
    })
}