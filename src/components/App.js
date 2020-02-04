import '../App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navigation from "./Navigation";
import Products from "./Products";
import Home from "./Home";
import 'antd/dist/antd.css';

import {Layout} from 'antd';
import ProductDetail from "./ProductDetail";
import OrdersActive from "./OrdersActive";
import Users from "./Users";


const App = () => {
    return (
        <Layout className="App">
            <BrowserRouter>
                <Navigation/>

                <Switch>
                    <Route path="/products/:id">
                        <ProductDetail/>
                    </Route>
                    <Route path="/products">
                        <Products/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/orders/active">
                        <OrdersActive/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Layout>
    );
};

export default App;
