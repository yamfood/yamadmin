import axios from 'axios';
import { message } from 'antd';
import { createAction } from 'redux-actions';
import api from '../apiRoutes';
import history from '../history';

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
    message.error('Логин/Пароль введен неправильно');
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
      history.push('/login/');
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
      history.push('/login/');
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
      history.push('/login/');
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
      history.push('/login/');
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
      history.push('/login/');
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
      history.push('/login/');
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
    await dispatch(setIsBlockedClientSuccess());
    dispatch(getClientDetails(clientId));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
  }
};

export const getRiderDetailsRequest = createAction('GET_RIDER_DETAILS_REQUEST');
export const getRiderDetailsFailure = createAction('GET_RIDER_DETAILS_FAILURE');
export const getRiderDetailsSuccess = createAction('GET_RIDER_DETAILS_SUCCESS');

export const getRiderDetails = (riderId) => async (dispatch) => {
  dispatch(getRiderDetailsRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(api.riderDetails(riderId), {
      headers: {
        token,
      },
    });
    dispatch(getRiderDetailsSuccess({ data: response.data, riderId }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(getRiderDetailsFailure());
  }
};

export const editRiderRequest = createAction('EDIT_RIDER_REQUEST');
export const editRiderFailure = createAction('EDIT_RIDER_FAILURE');
export const editRiderSuccess = createAction('EDIT_RIDER_SUCCESS');

export const editRider = ({ params, id }) => async (dispatch) => {
  dispatch(editRiderRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.patch(api.riderDetails(id), params, {
      headers: {
        token,
      },
    });
    dispatch(editRiderSuccess());
    history.push('/riders/');
    dispatch(getRiderDetails(id));
    message.success('Курьер успешно изменён', 3);
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(editRiderFailure());
  }
};

export const createRiderRequest = createAction('CREATE_RIDER_REQUEST');
export const createRiderFailure = createAction('CREATE_RIDER_FAILURE');
export const createRiderSuccess = createAction('CREATE_RIDER_SUCCESS');

export const createRider = (params) => async (dispatch) => {
  dispatch(createRiderRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.post(api.riders(), params, {
      headers: {
        token,
      },
    });
    await dispatch(createRiderSuccess());
    message.success('Курьер успешно создан', 3);
    history.push('/riders/')
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(createRiderFailure());
    message.error('Ошибка при создании курьера', 3);
  }
};

export const editDepositRequest = createAction('EDIT_DEPOSIT_REQUEST');
export const editDepositFailure = createAction('EDIT_DEPOSIT_FAILURE');
export const editDepositSuccess = createAction('EDIT_DEPOSIT_SUCCESS');

export const editDeposit = (deposit, id) => async (dispatch) => {
  dispatch(editDepositRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.post(api.riderDeposit(id), deposit, {
      headers: {
        token,
      },
    });
    await dispatch(editDepositSuccess());
    message.success('Депозит успешно изменен', 3);
    dispatch(getRiderDetails(id));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(editDepositFailure());
    message.error('Ошибка при изменение депозита', 3);
  }
};

export const cancelOrderRequest = createAction('CANCEL_ORDER_REQUEST');
export const cancelOrderFailure = createAction('CANCEL_ORDER_FAILURE');
export const cancelOrderSuccess = createAction('CANCEL_ORDER_SUCCESS');

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch(cancelOrderRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.post(api.cancelOrder(orderId), {}, {
      headers: {
        token,
      },
    });
    await dispatch(cancelOrderSuccess());
    message.success('Заказ успешно отменен', 3);
    dispatch(getActiveOrders());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(cancelOrderFailure());
    message.error('Ошибка при отменении заказа', 3);
  }
};

export const deleteAdminRequest = createAction('DELETE_ADMIN_REQUEST');
export const deleteAdminFailure = createAction('DELETE_ADMIN_FAILURE');
export const deleteAdminSuccess = createAction('DELETE_ADMIN_SUCCESS');

export const deleteAdmin = (id) => async (dispatch) => {
  dispatch(deleteAdminRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.delete(api.deleteAdmin(id), {
      headers: {
        token,
      },
    });
    await dispatch(deleteAdminSuccess());
    message.success('Админ успешно удален', 3);
    dispatch(getAdmins());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
    }
    dispatch(deleteAdminFailure());
    message.error('Ошибка при удалении админа', 3);
  }
};

export const getAdminEditDetails = createAction('GET_ADMIN_EDIT_DETAILS');

export const getAdminPermissionsRequest = createAction('GET_ADMIN_PERMISSIONS_REQUEST');
export const getAdminPermissionsFailure = createAction('GET_ADMIN_PERMISSIONS_FAILURE');
export const getAdminPermissionsSuccess = createAction('GET_ADMIN_PERMISSIONS_SUCCESS');

export const getAdminPermissions = () => async (dispatch) => {
  dispatch(getAdminPermissionsRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(api.adminPermissions(), {
      headers: {
        token,
      },
    });
    dispatch(getAdminPermissionsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(getAdminPermissionsFailure());
  }
};


export const editAdminRequest = createAction('EDIT_ADMIN_REQUEST');
export const editAdminFailure = createAction('EDIT_ADMIN_FAILURE');
export const editAdminSuccess = createAction('EDIT_ADMIN_SUCCESS');

export const editAdmin = (params, id) => async (dispatch) => {
  dispatch(editAdminRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.patch(api.editAdmin(id), params, {
      headers: {
        token,
      },
    });
    await dispatch(editAdminSuccess());
    message.success('Админ успешно изменен', 3);
    history.push('/admins/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(editAdminFailure());
    message.error('Ошибка при изменении админа', 3);
  }
};

export const createAdminRequest = createAction('CREATE_ADMIN_REQUEST');
export const createAdminFailure = createAction('CREATE_ADMIN_FAILURE');
export const createAdminSuccess = createAction('CREATE_ADMIN_SUCCESS');

export const createAdmin = (params) => async (dispatch) => {
  dispatch(createAdminRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.post(api.admins(), params, {
      headers: {
        token,
      },
    });
    await dispatch(createAdminSuccess());
    message.success('Админ успешно создан', 3);
    history.push('/admins/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(createAdminFailure());
    message.error('Ошибка при создании админа', 3);
  }
};

export const acceptOrderRequest = createAction('ACCEPT_ORDER_REQUEST');
export const acceptOrderFailure = createAction('ACCEPT_ORDER_FAILURE');
export const acceptOrderSuccess = createAction('ACCEPT_ORDER_SUCCESS');

export const acceptOrder = (orderId) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.post(api.acceptOrder(orderId), {}, {
      headers: {
        token,
      },
    });
    await dispatch(acceptOrderSuccess());
    message.success('Заказ успешно принят', 3);
    dispatch(getActiveOrders());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
    }
    dispatch(acceptOrderFailure());
    message.error('Ошибка при принятии заказа', 3);
  }
};

export const getCategoryRequest = createAction('GET_CATEGORY_REQUEST');
export const getCategoryFailure = createAction('GET_CATEGORY_FAILURE');
export const getCategorySuccess = createAction('GET_CATEGORY_SUCCESS');

export const getCategory = () => async (dispatch) => {
  dispatch(getCategoryRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(api.productsCategory(), {
      headers: {
        token,
      },
    });
    dispatch(getCategorySuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
    }
    dispatch(getCategoryFailure());
  }
};

export const createProductRequest = createAction('CREATE_PRODUCT_REQUEST');
export const createProductFailure = createAction('CREATE_PRODUCT_FAILURE');
export const createProductSuccess = createAction('CREATE_PRODUCT_SUCCESS');

export const createProduct = (params) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.post(api.products(), params, {
      headers: {
        token,
      },
    });
    await dispatch(createProductSuccess());
    message.success('Продукт успешно создан', 3);
    history.push('/products/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login/');
    }
    dispatch(createProductFailure());
    message.error('Ошибка при создании продукта', 3);
  }
};
