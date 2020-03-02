import axios from 'axios';
import { createAction } from 'redux-actions';
import api from '../apiRoutes';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginFailure = createAction('LOGIN_FAILURE');
export const loginSuccess = createAction('LOGIN_SUCCESS');

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(api.login(), {
      login: username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    dispatch(loginSuccess({ data: response.data }));
  } catch (e) {
    console.log(e);
    dispatch(loginFailure());
  }
};


export const getClientsRequest = createAction('GET_CLIENTS_REQUEST');
export const getClientsFailure = createAction('GET_CLIENTS_FAILURE');
export const getClientsSuccess = createAction('GET_CLIENTS_SUCCESS');

export const getClients = (params) => async (dispatch) => {
  dispatch(getClientsRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(api.clients(), {
      headers: {
        token,
      },
      params: {
        ...params,
        per_page: 2,
      },
    });
    dispatch(getClientsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
    }
  }
};


export const getKitchensRequest = createAction('GET_KITCHENS_REQUEST');
export const getKitchensFailure = createAction('GET_KITCHENS_FAILURE');
export const getKitchensSuccess = createAction('GET_KITCHENS_SUCCESS');

export const getKitchens = () => async (dispatch) => {
  dispatch(getKitchensRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(api.kitchens(), {
      headers: {
        token,
      },
    });
    const result = await response.json();
    dispatch(getKitchensSuccess({ data: result }));
  } catch (e) {
    console.log(e);
    if (e.error === 'Auth failed' || e.error === 'Auth required') {
      localStorage.removeItem('token');
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
    const token = localStorage.getItem('token');
    const response = await fetch(api.products(), {
      headers: {
        token,
      },
    });
    const result = await response.json();
    dispatch(getProductsSuccess({ data: result }));
  } catch (e) {
    console.log(e);
    if (e.error === 'Auth failed' || e.error === 'Auth required') {
      localStorage.removeItem('token');
    }
    dispatch(getProductsFailure());
  }
};


export const getRidersRequest = createAction('GET_RIDERS_REQUEST');
export const getRidersFailure = createAction('GET_RIDERS_FAILURE');
export const getRidersSuccess = createAction('GET_RIDERS_SUCCESS');

export const getRiders = (params) => async (dispatch) => {
  dispatch(getRidersRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(api.riders(), {
      headers: {
        token,
      },
      params: {
        ...params,
        per_page: 2,
      },
    });
    dispatch(getRidersSuccess({ data: response.data }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
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
    const token = localStorage.getItem('token');
    const response = await fetch(api.admins(), {
      headers: {
        token,
      },
    });
    const result = await response.json();
    dispatch(getAdminsSuccess({ data: result }));
  } catch (e) {
    console.log(e);
    if (e.error === 'Auth failed' || e.error === 'Auth required') {
      localStorage.removeItem('token');
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
    const token = localStorage.getItem('token');
    const response = await fetch(api.orderDetails(id), {
      headers: {
        token,
      },
    });
    const result = await response.json();
    dispatch(getOrderDetailsSuccess({ data: result }));
  } catch (e) {
    console.log(e);
    if (e.error === 'Auth failed' || e.error === 'Auth required') {
      localStorage.removeItem('token');
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
    const token = localStorage.getItem('token');
    const response = await fetch(api.orders(), {
      headers: {
        token,
      },
    });
    const result = await response.json();
    dispatch(getActiveOrdersSuccess({ data: result }));
  } catch (e) {
    console.log(e);
    if (e.error === 'Auth failed' || e.error === 'Auth required') {
      localStorage.removeItem('token');
    }
    dispatch(getActiveOrdersFailure());
  }
};

export const getClientDetailsRequest = createAction('GET_CLIENTDETAILS_REQUEST');
export const getClientDetailsFailure = createAction('GET_CLIENTDETAILS_FAILURE');
export const getClientDetailsSuccess = createAction('GET_CLIENTDETAILS_SUCCESS');

export const getClientDetails = (clientId) => async (dispatch) => {
  dispatch(getClientDetailsRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(api.clientDetails(clientId), {
      headers: {
        token,
      },
    });
    dispatch(getClientDetailsSuccess({ data: response.data, clientId }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
    }
    dispatch(getClientDetailsFailure());
  }
};

export const setIsBlockedClientRequest = createAction('SET_IS_BLOCKED_CLIENT_REQUEST');
export const setIsBlockedClientFailure = createAction('SET_IS_BLOCKED_CLIENT_FAILURE');
export const setIsBlockedClientSuccess = createAction('SET_IS_BLOCKED_CLIENT_SUCCESS');

export const setIsBlockedClient = (clientId, params) => async (dispatch) => {
  dispatch(setIsBlockedClientRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.patch(api.clientDetails(clientId), params, {
      headers: {
        token,
      },
    });
    dispatch(setIsBlockedClientSuccess());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
    }
  }
};
