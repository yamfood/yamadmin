import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

import * as actions from '../actions';


const users = handleActions({
    [actions.getUsersRequest](state) {
        return {
            ...state,
            status: 'request'
        }
    },
    [actions.getUsersFailure](state) {
        return {
            ...state,
            status: 'failure',
        }
    },
    [actions.getUsersSuccess](state, {payload: {data}}) {
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


export default combineReducers({
    users,
    products,
    auth
})

