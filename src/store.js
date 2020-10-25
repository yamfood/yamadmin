import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import { message } from 'antd';
import rootReducer from './reducers';

window.onPhoneCallClose = () => {};
window.onPhoneCall = ({ clientId }) => {
  message.warning('Входящий звонок');
  window.open(`/clients/${clientId}`, '_blank');
};

const middleware = applyMiddleware(thunk);

export default (initialState, window) => {
  if (window) {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState, composeEnhancers(middleware));
  }
  return createStore(rootReducer, initialState, middleware);
};
