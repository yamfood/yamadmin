import '../App.css';
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './Navigation';
import Products from './Products';
import Home from './Home';
import 'antd/dist/antd.css';
import ProductDetail from './ProductDetail';
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
import ProductCreate from './ProductCreate';

const App = () => (
  <Layout className="App">
    <Router history={history}>
      <Navigation />

      <Switch>
        <Route path="/login/" component={Login} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/products/create/" component={ProductCreate} />
        <PrivateRoute exact path="/products/:id/" component={ProductDetail} />
        <PrivateRoute path="/kitchens/" component={KitchensList} />
        <PrivateRoute path="/clients/" component={Clients} />
        <PrivateRoute exact path="/admins/" component={AdminsList} />
        <PrivateRoute exact path="/admins/:id/edit/" component={AdminEdit} />
        <PrivateRoute exact path="/admins/create/" component={AdminCreate} />
        <PrivateRoute exact path="/riders" component={RidersList} />
        <PrivateRoute exact path="/riders/:id/edit/" component={RiderEdit} />
        <PrivateRoute path="/orders/active/" component={OrdersActive} />
        <PrivateRoute exact path="/riders/create/" component={RiderCreate} />
        <PrivateRoute path="/orders/:id/" component={OrderDetails} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Router>
  </Layout>
);

export default App;
