import '../App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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


const App = () => (
  <Layout className="App">
    <BrowserRouter>
      <Navigation />

      <Switch>
        <Route path="/login/" component={Login} />
        <PrivateRoute path="/products/:id/" component={ProductDetail} />
        <PrivateRoute path="/products/" component={Products} />
        <PrivateRoute path="/kitchens/" component={KitchensList} />
        <PrivateRoute path="/clients/" component={Clients} />
        <PrivateRoute path="/admins/" component={AdminsList} />
        <PrivateRoute exact path="/riders" component={RidersList} />
        <PrivateRoute exact path="/riders/:id/edit/" component={RiderEdit} />
        <PrivateRoute path="/orders/active/" component={OrdersActive} />
        <PrivateRoute path="/orders/:id/" component={OrderDetails} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Layout>
);

export default App;
