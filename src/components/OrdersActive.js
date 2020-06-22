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
    dispatch(actions.setMenuActive(8));
    const intervalId = setInterval(() => dispatch(actions.getActiveOrders()), 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Title headTitle="Заказы: Активные" />
      <Content
        style={contentStyle}
      >
        <Tabs onChange={(key) => dispatch(actions.activeOrderTab(key))}>
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
    </>
  )
};


export default OrdersActive;
