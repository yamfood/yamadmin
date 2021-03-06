import '../App.css';
import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import {
  Layout,
} from 'antd';
import { useDispatch } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import Navigation from './Navigation';
import Products from './Products';
import Home from './Home';
import OrdersActive from './OrdersActive';
import Clients from './Clients';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import RidersList from './RidersList';
import AdminsList from './AdminsList';
import OrderDetails from './OrderDetails';
import KitchensList from './KitchensList';
import RiderEdit from './RiderEdit';
import RiderCreate from './RiderCreate';
import history from '../history';
import AdminEdit from './AdminEdit';
import AdminCreate from './AdminCreate';
import ProductEdit from './ProductEdit';
import ProductCreate from './ProductCreate';
import KitchenCreate from './KitchenCreate';
import OrdersFinished from './OrdersFinished';
import KitchenEdit from './KitchenEdit';
import Announcements from './Announcements';
import AnnouncementCreate from './AnnouncementCreate';
import AnnouncementEdit from './AnnouncementEdit';
import ParamsList from './ParamsList';
import TestDetails from './ClientEdit';
import ProductCategories from './ProductCategories';
import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';
import * as actions from '../actions';
import OrderLogs from './OrderLogs';
import ProductModifierEdit from './ProductModifierEdit';
import Notifications from './Notifications';
import OrderNew from './OrderNew';
import api from '../apiRoutes';
import ClientNew from './ClientNew';


const openCallsSocket = () => {
  try {
    const url = api.callsSocket().replace('http', 'ws');
    const socket = new WebSocket(url);
    socket.onopen = () => {
      const data = JSON.stringify({
        token: localStorage.getItem('token'),
      });
      socket.send(data);
    };
    socket.onmessage = (m) => {
      const data = JSON.parse(m.data);
      window.onPhoneCall({ clientId: data.client_id, phone: data.phone })
    };
    socket.onclose = () => {
      openCallsSocket();
    };
    return socket;
  } catch (error) {
    console.error(error);
  }
  return null;
};


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getMe());
    openCallsSocket();
  }, [dispatch]);

  return (
    <Layout className="App">
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Notifications />
          <Navigation />
          <Switch>
            <Route path="/login/" component={Login} />
            <PrivateRoute exact path="/products/create/" component={ProductCreate} />
            <PrivateRoute exact path="/products" component={Products} />
            <PrivateRoute exact path="/products/modifiers/:id/edit/" component={ProductModifierEdit} />
            <PrivateRoute exact path="/products/:id/edit/" component={ProductEdit} />
            <PrivateRoute exact path="/products/categories/" component={ProductCategories} />
            <PrivateRoute exact path="/products/categories/create/" component={CategoryCreate} />
            <PrivateRoute exact path="/products/categories/:id/edit/" component={CategoryEdit} />
            <PrivateRoute exact path="/kitchens/create/" component={KitchenCreate} />
            <PrivateRoute exact path="/kitchens" component={KitchensList} />
            <PrivateRoute exact path="/kitchens/:id/edit/" component={KitchenEdit} />
            <PrivateRoute exact path="/clients/" component={Clients} />
            <PrivateRoute exact path="/clients/new/" component={ClientNew} />
            <PrivateRoute exact path="/clients/:id/" component={TestDetails} />
            <PrivateRoute exact path="/admins/" component={AdminsList} />
            <PrivateRoute exact path="/admins/:id/edit/" component={AdminEdit} />
            <PrivateRoute exact path="/admins/create/" component={AdminCreate} />
            <PrivateRoute exact path="/riders" component={RidersList} />
            <PrivateRoute exact path="/riders/:id/edit/" component={RiderEdit} />
            <PrivateRoute exact path="/orders/active/" component={OrdersActive} />
            <PrivateRoute exact path="/riders/create/" component={RiderCreate} />
            <PrivateRoute exact path="/orders/finished/" component={OrdersFinished} />
            <PrivateRoute exact path="/orders/new/" component={OrderNew} />
            <PrivateRoute exact path="/orders/:id/" component={OrderDetails} />
            <PrivateRoute exact path="/orders/:id/logs/" component={OrderLogs} />
            <PrivateRoute exact path="/announcements/" component={Announcements} />
            <PrivateRoute exact path="/announcements/create/" component={AnnouncementCreate} />
            <PrivateRoute exact path="/announcements/:id/edit/" component={AnnouncementEdit} />
            <PrivateRoute exact path="/params/" component={ParamsList} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </QueryParamProvider>
      </Router>
    </Layout>
  )
};

export default App;
