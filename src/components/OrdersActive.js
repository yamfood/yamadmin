import React, { useEffect } from 'react';
import {
  Layout,
  Tabs,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import OrdersTable from './OrdersTable';
import Title from './shared/Title';
import * as actions from '../actions';
import { contentStyle } from '../assets/style';

const { Content } = Layout;
const { TabPane } = Tabs;

const OrdersActive = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.activeOrders);
  useEffect(() => {
    dispatch(actions.getActiveOrders());
    dispatch(actions.setMenuActive(7));
    const intervalId = setInterval(() => dispatch(actions.getActiveOrders()), 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Title headTitle="Заказы: Активные" />
      <Content
        style={contentStyle}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Заказы</h1>
        <Tabs
          defaultActiveKey="1"
          size="small"
          onChange={(activeKey) => {
            dispatch(actions.activeOrderTab(activeKey));
          }}
        >
          <TabPane tab={`Новые (${orders.new.length})`} key="1">
            <OrdersTable orders={orders.new} loading={orders.loading} />
          </TabPane>
          <TabPane tab={`На кухне (${orders.onKitchen.length})`} key="2">
            <OrdersTable orders={orders.onKitchen} loading={orders.loading} />
          </TabPane>
          <TabPane tab={`В пути (${orders.onWay.length})`} key="3">
            <OrdersTable orders={orders.onWay} loading={orders.loading} />
          </TabPane>
        </Tabs>
      </Content>
    </>
  )
};


export default OrdersActive;
