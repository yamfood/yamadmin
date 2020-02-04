import React from "react";
import {Layout} from "antd";
import { Tabs } from 'antd';
import OrdersTable from "./OrdersTable";


const {Content} = Layout;
const { TabPane } = Tabs;


const OrdersActive = () => {
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
                <TabPane tab="Новые (10)" key="1">
                    <OrdersTable/>
                </TabPane>
                <TabPane tab="На кухне (31)" key="2">
                    <OrdersTable/>
                </TabPane>
                <TabPane tab="В пути (19)" key="3">
                    <OrdersTable/>
                </TabPane>
                <TabPane tab="Опаздывают (3)" key="4">
                    <OrdersTable/>
                </TabPane>
            </Tabs>
        </Content>
    )
};


export default OrdersActive;
