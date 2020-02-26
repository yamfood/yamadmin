import api from "../apiRoutes"
import axios from 'axios';
import {createAction} from 'redux-actions';


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
        localStorage.setItem("token", result.token);
        dispatch(loginSuccess({data: result}));
    } catch (e) {
        console.log(e);
        dispatch(loginFailure());
    }
};


export const getUsersRequest = createAction('GET_USERS_REQUEST');
export const getUsersFailure = createAction('GET_USERS_FAILURE');
export const getUsersSuccess = createAction('GET_USERS_SUCCESS');

export const getUsers = (params) => async (dispatch) => {
    dispatch(getUsersRequest());
    try {
        const token = localStorage.getItem("token");
        const result = await axios.get(api.clients(), {
            headers: {
                token: token
            },
            params: {
              ...params
            }
        });
        // const result = await response.json();
        console.log('this is response: ', result);
        dispatch(getUsersSuccess({data: result.data}));
    } catch (e) {
        console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getUsersFailure());
    }
};


export const getKitchensRequest = createAction('GET_KITCHENS_REQUEST');
export const getKitchensFailure = createAction('GET_KITCHENS_FAILURE');
export const getKitchensSuccess = createAction('GET_KITCHENS_SUCCESS');

export const getKitchens = () => async (dispatch) => {
    dispatch(getKitchensRequest());
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(api.kitchens(), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getKitchensSuccess({data: result}));
    } catch (e) {
        console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getKitchensFailure());
    }
};


export const getProductsRequest = createAction('GET_PRODUCTS_REQUEST');
export const getProductsFailure = createAction('GET_PRODUCTS_FAILURE');
export const getProductsSuccess = createAction('GET_PRODUCTS_SUCCESS');

export const getProducts = () => async (dispatch) => {
    dispatch(getProductsRequest());
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(api.products(), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getProductsSuccess({data: result}));
    } catch (e) {
        console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getProductsFailure());
    }
};


export const getRidersRequest = createAction('GET_RIDERS_REQUEST');
export const getRidersFailure = createAction('GET_RIDERS_FAILURE');
export const getRidersSuccess = createAction('GET_RIDERS_SUCCESS');

export const getRiders = () => async (dispatch) => {
    dispatch(getRidersRequest());
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(api.riders(), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getRidersSuccess({data: result}));
    } catch (e) {
        console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getRidersFailure());
    }
};


export const getAdminsRequest = createAction('GET_ADMINS_REQUEST');
export const getAdminsFailure = createAction('GET_ADMINS_FAILURE');
export const getAdminsSuccess = createAction('GET_ADMINS_SUCCESS');

export const getAdmins = () => async (dispatch) => {
    dispatch(getAdminsRequest());
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(api.admins(), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getAdminsSuccess({data: result}));
    } catch (e) {
        console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getAdminsFailure());
    }
};


export const getOrderDetailsRequest = createAction('GET_ORDER_DETAILS_REQUEST');
export const getOrderDetailsFailure = createAction('GET_ORDER_DETAILS_FAILURE');
export const getOrderDetailsSuccess = createAction('GET_ORDER_DETAILS_SUCCESS');

export const getOrderDetails = (id) => async (dispatch) => {
    dispatch(getOrderDetailsRequest());
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(api.orderDetails(id), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getOrderDetailsSuccess({data: result}));
    } catch (e) {
        console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getOrderDetailsFailure());
    }
};


export const getActiveOrdersRequest = createAction('GET_ACTIVE_ORDERS_REQUEST');
export const getActiveOrdersFailure = createAction('GET_ACTIVE_ORDERS_FAILURE');
export const getActiveOrdersSuccess = createAction('GET_ACTIVE_ORDERS_SUCCESS');

export const getActiveOrders = () => async (dispatch) => {
    dispatch(getActiveOrdersRequest());
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(api.orders(), {
            headers: {
                token: token
            }
        });
        const result = await response.json();
        dispatch(getActiveOrdersSuccess({data: result}));
    } catch (e) {
        console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getActiveOrdersFailure());
    }
};

export const getClientDetailsRequest = createAction('GET_CLIENT_DETAILS_REQUEST');
export const getClientDetailsFailed = createAction('GET_CLIENT_DETAILS_FAILED');
export const getClientDetailsSuccess = createAction('GET_CLIENT_DETAILS_SUCCESS');

export const getClientDetails = (id) => async (dispatch) => {
  dispatch(getClientDetails());
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get(api.clientDetails(id), {
            headers: {
                token: token
            }
        });
        console.log('this is result: ', result);
        dispatch(getClientDetailsSuccess());
  } catch (e) {
    console.log(e);
        if (e.error === 'Auth failed' || e.error === "Auth required") {
            localStorage.removeItem("token");
        }
        dispatch(getClientDetailsFailed());
  }
};