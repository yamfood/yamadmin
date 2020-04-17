import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import * as actions from '../actions';


const clients = handleActions({
  [actions.getClientsRequest](state) {
    return {
      ...state,
      status: 'request',
    };
  },
  [actions.getClientsFailure](state) {
    return {
      ...state,
      status: 'failure',
    };
  },
  [actions.getClientsSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data.data,
      page: data.page,
      total: data.count,
    }
  },
  [actions.getClientDetailsRequest](state) {
    return {
      ...state,
      detailsStatus: 'request',
    }
  },
  [actions.getClientDetailsFailure](state) {
    return {
      ...state,
      detailsStatus: 'failure',
    };
  },
  [actions.getClientDetailsSuccess](state, { payload: { data, clientId } }) {
    return {
      ...state,
      detailsStatus: 'success',
      detailsData: {
        ...state.detailsData,
        [clientId]: data,
      },
    };
  },
  [actions.setIsBlockedClientRequest](state) {
    return {
      ...state,
      blockedStatus: 'request',
    }
  },
  [actions.setIsBlockedClientFailure](state) {
    return {
      ...state,
      blockedStatus: 'failure',
    };
  },
  [actions.setIsBlockedClientSuccess](state) {
    return {
      ...state,
      blockedStatus: 'success',
    }
  },
}, {
  list: [],
  status: null,
  page: 1,
  detailsData: {},
});

const riders = handleActions({
  [actions.getRidersRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getRidersFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getRidersSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data.data,
      total: data.count,
      page: data.page,
    }
  },
  [actions.getRiderDetailsRequest](state) {
    return {
      ...state,
      riderDetailsStatus: 'request',
    }
  },
  [actions.getRiderDetailsFailure](state) {
    return {
      ...state,
      riderDetailsStatus: 'failure',
    };
  },
  [actions.getRiderDetailsSuccess](state, { payload: { data, riderId } }) {
    const riderDetail = Object.entries(data).map(((detail) => ({
      label: detail[0],
      value: detail[1],
    })));
    return {
      ...state,
      riderDetailsStatus: 'success',
      riderDetails: {
        ...state.riderDetails,
        [riderId]: riderDetail,
      },
      editRiderDetails: data,
    };
  },
  [actions.editRiderRequest](state) {
    return {
      ...state,
      editRiderStatus: 'request',
    };
  },
  [actions.editRiderFailure](state) {
    return {
      ...state,
      editRiderStatus: 'failure',
    };
  },
  [actions.editRiderSuccess](state) {
    return {
      ...state,
      editRiderStatus: 'success',
    };
  },
  [actions.createRiderRequest](state) {
    return {
      ...state,
      createRiderStatus: 'request',
    };
  },
  [actions.createRiderFailure](state) {
    return {
      ...state,
      createRiderStatus: 'failure',
    };
  },
  [actions.createRiderSuccess](state) {
    return {
      ...state,
      createRiderStatus: 'success',
    };
  },
  [actions.editDepositRequest](state) {
    return {
      ...state,
      depositStatus: 'request',
    };
  },
  [actions.editDepositFailure](state) {
    return {
      ...state,
      depositStatus: 'failure',
    };
  },
  [actions.editDepositSuccess](state) {
    return {
      ...state,
      depositStatus: 'success',
    };
  },
}, {
  list: [],
  status: null,
  page: 1,
  editRiderDetails: {
    tid: null,
    name: null,
    phone: null,
    notes: null,
    is_blocked: null,
  },
  riderDetailsStatus: null,
  riderDetails: {},
});


const products = handleActions({
  [actions.getProductsRequest](state) {
    return {
      ...state,
      status: 'request',
    };
  },
  [actions.getProductsFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getProductsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      list: data,
    }
  },
  [actions.getCategoryRequest](state) {
    return {
      ...state,
      categoryStatus: 'request',
    };
  },
  [actions.getCategoryFailure](state) {
    return {
      ...state,
      categoryStatus: 'failure',
    };
  },
  [actions.getCategorySuccess](state, { payload: { data } }) {
    return {
      ...state,
      categoryStatus: 'success',
      categories: data,
    };
  },
  [actions.getProductDetailsRequest](state) {
    return {
      ...state,
      productDetailsStatus: 'request',
    };
  },
  [actions.getProductDetailsFailure](state) {
    return {
      ...state,
      productDetailsStatus: 'failure',
    };
  },
  [actions.getProductDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productDetailsStatus: 'success',
      productDetails: data,
    };
  },
  [actions.editProductRequest](state) {
    return {
      ...state,
      editProductStatus: 'request',
    };
  },
  [actions.editProductFailure](state) {
    return {
      ...state,
      editProductStatus: 'failure',
    };
  },
  [actions.editProductSuccess](state) {
    return {
      ...state,
      editProductStatus: 'success',
    };
  },
  [actions.createProductRequest](state) {
    return {
      ...state,
      productCreateStatus: 'request',
    };
  },
  [actions.createProductFailure](state) {
    return {
      ...state,
      productCreateStatus: 'failure',
    };
  },
  [actions.createProductSuccess](state) {
    return {
      ...state,
      productCreateStatus: 'success',
    };
  },
  [actions.deleteProductRequest](state) {
    return {
      ...state,
      deleteStatus: 'request',
    };
  },
  [actions.deleteProductFailure](state) {
    return {
      ...state,
      deleteStatus: 'failure',
    };
  },
  [actions.deleteProductSuccess](state) {
    return {
      ...state,
      deleteStatus: 'success',
    };
  },
}, {
  list: [],
  status: null,
  categories: [],
  productDetails: [],
});


const admins = handleActions({
  [actions.getAdminsRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getAdminsFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getAdminsSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data,
    }
  },
  [actions.deleteAdminRequest](state) {
    return {
      ...state,
      deleteAdminStatus: 'request',
    };
  },
  [actions.deleteAdminFailure](state) {
    return {
      ...state,
      deleteAdminStatus: 'failure',
    };
  },
  [actions.deleteAdminSuccess](state) {
    return {
      ...state,
      deleteAdminStatus: 'success',
    }
  },
  [actions.getAdminPermissionsRequest](state) {
    return {
      ...state,
      permissionStatus: 'request',
    };
  },
  [actions.getAdminPermissionsFailure](state) {
    return {
      ...state,
      permissionStatus: 'failure',
    };
  },
  [actions.getAdminPermissionsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      permissionStatus: 'success',
      permissions: data,
    };
  },
  [actions.getAdminEditDetails](state, { payload }) {
    return {
      ...state,
      editingAdminDetails: payload,
    };
  },
  [actions.editAdminRequest](state) {
    return {
      ...state,
      editAdminStatus: 'request',
    }
  },
  [actions.editAdminFailure](state) {
    return {
      ...state,
      editAdminStatus: 'failure',
    }
  },
  [actions.editAdminSuccess](state) {
    return {
      ...state,
      editAdminStatus: 'success',
    }
  },
  [actions.createAdminRequest](state) {
    return {
      ...state,
      createAdminStatus: 'request',
    };
  },
  [actions.createAdminFailure](state) {
    return {
      ...state,
      createAdminStatus: 'failure',
    };
  },
  [actions.createAdminSuccess](state) {
    return {
      ...state,
      createAdminStatus: 'success',
    };
  },
}, {
  list: [],
  status: null,
  permissions: [],
});


const kitchens = handleActions({
  [actions.getKitchensRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getKitchensFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getKitchensSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data,
    }
  },
  [actions.getKitchenDetailsRequest](state) {
    return {
      ...state,
      detailStatus: 'request',
    };
  },
  [actions.getKitchenDetailsFailure](state) {
    return {
      ...state,
      detailStatus: 'failure',
    };
  },
  [actions.getKitchenDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      detailStatus: 'success',
      details: data,
      disabledProducts: data.disabled_products,
    };
  },
  [actions.createKitchenRequest](state) {
    return {
      ...state,
      createStatus: 'request',
    };
  },
  [actions.createKitchenFailure](state) {
    return {
      ...state,
      createStatus: 'failure',
    };
  },
  [actions.createKitchenSuccess](state) {
    return {
      ...state,
      createStatus: 'success',
    };
  },
  [actions.editKitchenRequest](state) {
    return {
      ...state,
      editStatus: 'request',
    };
  },
  [actions.editKitchenFailure](state) {
    return {
      ...state,
      editStatus: 'failure',
    };
  },
  [actions.editKitchenSuccess](state) {
    return {
      ...state,
      editStatus: 'success',
    };
  },
  [actions.getKitchenProductsRequest](state) {
    return {
      ...state,
      productsStatus: 'request',
    };
  },
  [actions.getKitchenProductsFailure](state) {
    return {
      ...state,
      productsStatus: 'failure',
    };
  },
  [actions.getKitchenProductsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productsStatus: 'success',
      productsForModal: data,
    }
  },
  [actions.addDisabledProductRequest](state) {
    return {
      ...state,
      productsAddStatus: 'request',
    };
  },
  [actions.addDisabledProductFailure](state) {
    return {
      ...state,
      productsAddStatus: 'failure',
    };
  },
  [actions.addDisabledProductSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productsAddStatus: 'success',
      disabledProducts: data.disabled_products,
    }
  },
  [actions.deleteDisabledProductRequest](state) {
    return {
      ...state,
      productsDeleteStatus: 'request',
    };
  },
  [actions.deleteDisabledProductFailure](state) {
    return {
      ...state,
      productsDeleteStatus: 'failure',
    };
  },
  [actions.deleteDisabledProductSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productsDeleteStatus: 'success',
      disabledProducts: data.disabled_products,
    }
  },
}, {
  list: [],
  status: null,
  details: {
    location: {
      longitude: null,
      latitude: null,
    },
  },
  productsForModal: [],
  disabledProducts: [],
});


const auth = handleActions({
  [actions.loginRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.loginFailure](state) {
    return {
      ...state,
      status: 'failure',
      token: null,
    }
  },
  [actions.loginSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      token: data.token,
    }
  },
}, {
  token: null,
  status: null,
});

const activeOrders = handleActions({
  [actions.getActiveOrdersRequest](state) {
    return {
      ...state,
      status: 'request',
      loading: state.loading === null ? true : state.loading,
    };
  },
  [actions.getActiveOrdersFailure](state) {
    return {
      ...state,
      status: 'failure',
    };
  },
  [actions.getActiveOrdersSuccess](state, { payload: { data } }) {
    return {
      ...state,
      loading: false,
      status: 'success',
      ...data,
    };
  },
  [actions.acceptOrderRequest](state) {
    return {
      ...state,
      acceptStatus: 'request',
    };
  },
  [actions.acceptOrderFailure](state) {
    return {
      ...state,
      acceptStatus: 'failure',
    };
  },
  [actions.acceptOrderSuccess](state) {
    return {
      ...state,
      acceptStatus: 'success',
    };
  },
  [actions.cancelOrderRequest](state) {
    return {
      ...state,
      cancelStatus: 'request',
    };
  },
  [actions.cancelOrderFailure](state) {
    return {
      ...state,
      cancelStatus: 'failure',
    };
  },
  [actions.cancelOrderSuccess](state) {
    return {
      ...state,
      cancelStatus: 'success',
    };
  },
  [actions.activeOrderTab](state, { payload }) {
    return {
      ...state,
      activeTabKey: parseInt(payload, 10),
    }
  },
}, {
  status: null,
  loading: null,
  new: [],
  onKitchen: [],
  ready: [],
  onWay: [],
  late: [],
  activeTabKey: 1,
});

const orderDetails = handleActions({
  [actions.getOrderDetailsRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getOrderDetailsFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getOrderDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      [data.id]: data,
    }
  },
}, {
  status: null,
});

const finishedOrders = handleActions({
  [actions.getFinishedOrdersRequest](state) {
    return {
      ...state,
      status: 'request',
    };
  },
  [actions.getFinishedOrdersFailure](state) {
    return {
      ...state,
      status: 'failed',
    };
  },
  [actions.getFinishedOrdersSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      list: data.data,
      total: data.count,
      page: data.page,
    }
  },
}, {
  list: [],
  page: 1,
});

const announcements = handleActions({
  [actions.getAnnouncementsRequest](state) {
    return {
      ...state,
      listStatus: 'request',
    };
  },
  [actions.getAnnouncementsFailure](state) {
    return {
      ...state,
      listStatus: 'failure',
    };
  },
  [actions.getAnnouncementsSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      listStatus: 'success',
      advertisements: data.data,
      page: data.page,
      count: data.count,
    };
  },
}, {
  page: 1,
  advertisements: [],
});

export default combineReducers({
  clients,
  riders,
  kitchens,
  products,
  auth,
  admins,
  activeOrders,
  orderDetails,
  finishedOrders,
  announcements,
});
