import React, {useEffect} from "react";
import {Layout} from "antd";
import { Tabs } from 'antd';
import OrdersTable from "./OrdersTable";
import {connect} from "react-redux";
import {getActiveOrders} from "../actions";


const {Content} = Layout;
const { TabPane } = Tabs;


const mapStateToProps = (state) => {
    return {
        orders: state.activeOrders
    }
};


const actionsCreator = {
    getActiveOrders: getActiveOrders
};


const OrdersActive = (props) => {

    const {orders, getActiveOrders} = props;

    useEffect(() => {
        if (orders.status === null) {
            setInterval(getActiveOrders, 5000);
            getActiveOrders();
        }
    });

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
            }}
        >
            <h1 style={{fontSize: 30, textAlign: "center"}}>Заказы</h1>
            <Tabs defaultActiveKey="1" size='small'>
                <TabPane tab={`Новые (${orders.new.length})`} key="1">
                    <OrdersTable orders={orders.new}/>
                </TabPane>
                <TabPane tab={`На кухне (${orders.onKitchen.length})`} key="2">
                    <OrdersTable orders={orders.onKitchen}/>
                </TabPane>
                <TabPane tab={`Готовы (${orders.ready.length})`} key="4">
                    <OrdersTable orders={orders.ready}/>
                </TabPane>
                <TabPane tab={`В пути (${orders.onWay.length})`} key="3">
                    <OrdersTable orders={orders.onWay}/>
                </TabPane>
                <TabPane tab={`Опаздывают (${orders.late.length})`} key="5">
                    <OrdersTable orders={orders.late}/>
                </TabPane>
            </Tabs>
        </Content>
    )
};


export default connect(
    mapStateToProps,
    actionsCreator
)(OrdersActive);
