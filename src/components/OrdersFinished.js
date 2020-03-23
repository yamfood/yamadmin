import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layout,
  Table,
  Button,
  Icon,
} from 'antd';
import * as actions from '../actions';
import OrdersFinishedForm from './OrdersFinishedForm';

const { Content } = Layout;

const OrdersFinished = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.finishedOrders);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Клиент', dataIndex: 'name', key: 'name' },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    { title: 'Кухня', dataIndex: 'kitchen', key: 'kitchen' },
    { title: 'Сумма', dataIndex: 'total_sum', key: 'total_sum' },
    { title: 'Статус заказа', dataIndex: 'status', key: 'status' },
    { title: 'Комменты', dataIndex: 'comment', key: 'comment' },
    { title: 'Имя Курьeра', dataIndex: 'rider_name', key: 'rider_name' },
    { title: 'Телефон Курьера', dataIndex: 'rider_phone', key: 'rider_phone' },
    { title: 'Дата создания', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Локация', children: [{ title: 'Долгота', dataIndex: 'longitude', key: 'longitude' }, { title: 'Широта', dataIndex: 'latitude', key: 'latitude' }] },
  ];

  useEffect(() => {
    dispatch(actions.getFinishedOrders());
  }, []);

  const loading = orders.status === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 'auto',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Завершенные Заказы</h1>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <Button
            onClick={() => dispatch(actions.getFinishedOrders())}
          >
            <Icon type="reload" />
          </Button>
          <OrdersFinishedForm />
        </div>
        <Table
          bordered="true"
          size="small"
          columns={columns}
          loading={loading}
          dataSource={orders.list.map((order) => ({
            ...order,
            key: order.id,
            longitude: order.location.longitude,
            latitude: order.location.latitude,
          }))}
        />
      </Content>
    </Layout>
  );
};

export default OrdersFinished;
