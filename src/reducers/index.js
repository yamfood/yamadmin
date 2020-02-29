import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

import * as actions from '../actions';


const clients = handleActions({
    [actions.getClientsRequest](state) {
        return {
            ...state,
            status: 'request'
        }
    },
    [actions.getClientsFailure](state) {
        return {
            ...state,
            status: 'failure',
        }
    },
    [actions.getClientsSuccess](state, {payload: {data}}) {
        console.log(data);
        return {
            ...state,
            status: 'success',
            list: data,
            page: data.page
        }
    },
    [actions.getClientDetailsRequest](state) {
      return {
        ...state,
        statusForDetails: 'request'
      }
    },
    [actions.getClientDetailsFailure](state) {
      return {
        ...state,
        statusForDetails: 'failure'
      };
    },
    [actions.getClientDetailsSuccess](state, {payload: {data, clientId}}) {
      return {
        ...state,
        statusForDetails: 'success',
        detailsData: {
          ...state.detailsData,
          [clientId]: data,
        },
      };
    },
}, {
    list: {
      data: []
    },
    status: null,
    page: 1,
    detailsData: {}
});

const riders = handleActions({
  [actions.getRidersRequest](state) {
      return {
          ...state,
          status: 'request'
      }
  },
  [actions.getRidersFailure](state) {
      return {
          ...state,
          status: 'failure',
      }
  },
  [actions.getRidersSuccess](state, {payload: {data}}) {
      console.log(data);
      return {
          ...state,
          status: 'success',
          list: data
      }
  }
}, {
  list: [],
  status: null
});


const products = handleActions({
    [actions.getProductsRequest](state) {
        return {
            ...state,
            status: 'request'
        }
    },
    [actions.getProductsFailure](state) {
        return {
            ...state,
            status: 'failure',
        }
    },
    [actions.getProductsSuccess](state, {payload: {data}}) {
        console.log(data);
        return {
            ...state,
            status: 'success',
            list: data
        }
    }
}, {
    list: [],
    status: null
});


const admins = handleActions({
    [actions.getAdminsRequest](state) {
        return {
            ...state,
            status: 'request'
        }
    },
    [actions.getAdminsFailure](state) {
        return {
            ...state,
            status: 'failure',
        }
    },
    [actions.getAdminsSuccess](state, {payload: {data}}) {
        console.log(data);
        return {
            ...state,
            status: 'success',
            list: data
        }
    }
}, {
    list: [],
    status: null
});


const kitchens = handleActions({
    [actions.getKitchensRequest](state) {
        return {
            ...state,
            status: 'request'
        }
    },
    [actions.getKitchensFailure](state) {
        return {
            ...state,
            status: 'failure',
        }
    },
    [actions.getKitchensSuccess](state, {payload: {data}}) {
        console.log(data);
        return {
            ...state,
            status: 'success',
            list: data
        }
    }
}, {
    list: [],
    status: null
});


const auth = handleActions({
    [actions.loginRequest](state) {
        return {
            ...state,
            status: 'request'
        }
    },
    [actions.loginFailure](state) {
        return {
            ...state,
            status: 'failure',
        }
    },
    [actions.loginSuccess](state, {payload: {data}}) {
        console.log(data);
        return {
            ...state,
            status: 'success',
            token: data.token
        }
    }
}, {
    token: null,
    status: null
});


const activeOrders = handleActions({
    [actions.getActiveOrdersRequest](state) {
        let loading = state.loading;

        if (state.status === null) {
            loading = true;
        }

        return {
            ...state,
            status: 'request',
            loading: loading
        }
    },
    [actions.getActiveOrdersFailure](state) {
        return {
            ...state,
            status: 'failure',
        }
    },
    [actions.getActiveOrdersSuccess](state, {payload: {data}}) {
        return {
            ...state,
            loading: false,
            status: 'success',
            ...data
        }
    }
}, {
    status: null,
    loading: false,
    new: [],
    onKitchen: [],
    ready: [],
    onWay: [],
    late: []
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
    [actions.getOrderDetailsSuccess](state, {payload: {data}}) {
        return {
            ...state,
            status: 'success',
            [data.id]: data
        }
    }
}, {
    status: null,
});


export default combineReducers({
    clients,
    riders,
    kitchens,
    products,
    auth,
    admins,
    activeOrders,
    orderDetails
})