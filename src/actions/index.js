import api from "../apiRoutes"
import {createAction} from 'redux-actions';

export const getUsersRequest = createAction('GET_USERS_REQUEST');
export const getUsersFailure = createAction('GET_USERS_FAILURE');
export const getUsersSuccess = createAction('GET_USERS_SUCCESS');

export const getUsers = () => async (dispatch) => {
    dispatch(getUsersRequest());
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(api.users(), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getUsersSuccess({data: result}));
    } catch (e) {
        console.log(e);
        localStorage.removeItem("token")
        dispatch(getUsersFailure());
    }
};


export const getProductsRequest = createAction('GET_PRODUCTS_REQUEST');
export const getProductsFailure = createAction('GET_PRODUCTS_FAILURE');
export const getProductsSuccess = createAction('GET_PRODUCTS_SUCCESS');

export const getProducts = () => async (dispatch) => {
    dispatch(getProductsRequest());
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(api.products(), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getProductsSuccess({data: result}));
    } catch (e) {
        console.log(e);
        localStorage.removeItem("token")
        dispatch(getProductsFailure());
    }
};


export const loginRequest = createAction('LOGIN_REQUEST');
export const loginFailure = createAction('LOGIN_FAILURE');
export const loginSuccess = createAction('LOGIN_SUCCESS');

export const login = (login, password) => async (dispatch) => {
    dispatch(loginRequest());

    const data = {
        login: login,
        password: password
    };

    try {
        const response = await fetch(api.login(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        dispatch(loginSuccess({data: result}));
        localStorage.setItem('token', result.token)
    } catch (e) {
        console.log(e);
        dispatch(loginFailure());
    }
};