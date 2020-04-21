import React, { useEffect } from 'react';
import {
  Layout,
  Tabs,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import OrdersTable from './OrdersTable';
import * as actions from '../actions';

const { Content } = Layout;
const { TabPane } = Tabs;

const OrdersActive = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.activeOrders);

  useEffect(() => {
    dispatch(actions.getActiveOrders());
    const intervalId = setInterval(() => dispatch(actions.getActiveOrders()), 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        background: '#fff',
        minHeight: 'auto',
      }}
    >
      <h1 style={{ fontSize: 30, textAlign: 'center' }}>Заказы</h1>
      <Tabs
        defaultActiveKey="1"
        size="small"
        onChange={(activeKey) => {
          dispatch(actions.activeOrderTab(activeKey));
        }}
      >
        <TabPane tab={`Новые (${orders.new.list.length})`} key="1">
          <OrdersTable orders={orders.new.list} loading={orders.loading} />
        </TabPane>
        <TabPane tab={`На кухне (${orders.onKitchen.list.length})`} key="2">
          <OrdersTable orders={orders.onKitchen.list} loading={orders.loading} />
        </TabPane>
        <TabPane tab={`В пути (${orders.onWay.list.length})`} key="3">
          <OrdersTable orders={orders.onWay.list} loading={orders.loading} />
        </TabPane>
      </Tabs>
    </Content>
  )
};


export default OrdersActive;
