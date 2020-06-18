import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layout,
  Table,
  Button,
  Icon,
} from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import OrdersFinishedForm from './OrdersFinishedForm';
import pagination from './pagination';
import Title from './shared/Title';
import { contentStyle } from '../assets/style';

const { Content } = Layout;

const OrdersFinished = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.finishedOrders);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Link to={`/orders/${id}/`}>{id}</Link>,
      fixed: true,
      width: 60,
    },
    { title: 'Клиент', dataIndex: 'name', key: 'name' },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    { title: 'Кухня', dataIndex: 'kitchen', key: 'kitchen' },
    {
      title: 'Сумма',
      dataIndex: 'total_sum',
      key: 'total_sum',
      render: (money) => `${money.toLocaleString('ru')} сум`,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        switch (text) {
          case 'canceled':
            return <p style={{ fontWeight: 'bold', color: 'red' }}>Отменен</p>;
          case 'finished':
            return <p style={{ fontWeight: 'bold', color: 'green' }}>Завершен</p>;
          default:
        }
        return null;
      },
    },
    { title: 'Комментарий', dataIndex: 'comment', key: 'comment' },
    { title: 'Имя Курьeра', dataIndex: 'rider_name', key: 'rider_name' },
    { title: 'Телефон Курьера', dataIndex: 'rider_phone', key: 'rider_phone' },
    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    { title: 'Адрес', dataIndex: 'address', key: 'address' },
    { title: 'Оценка', dataIndex: 'rate', key: 'rate' },
  ];

  useEffect(() => {
    dispatch(actions.getFinishedOrders());
    dispatch(actions.setMenuActive(10));
  }, []);

  const loading = orders.status === 'request';

  return (
    <>
      <Title headTitle="Заказы: Завершенные" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Завершенные Заказы</h1>
          <div style={{ display: 'flex', marginBottom: 10, flexWrap: 'wrap' }}>
            <Button
              onClick={() => dispatch(actions.getFinishedOrders())}
            >
              <Icon type="reload" />
            </Button>
            <OrdersFinishedForm />
          </div>
          <Table
            bordered
            size="small"
            columns={columns}
            loading={loading}
            dataSource={orders.list.map((order) => ({
              ...order,
              key: order.id,
              longitude: order.location.longitude,
              latitude: order.location.latitude,
            }))}
            scroll={{ x: 1600 }}
            pagination={pagination(
              orders.total,
              15,
              actions.getFinishedOrders,
              orders.page,
              dispatch,
            )}
          />
        </Content>
      </Layout>
    </>
  );
};

export default OrdersFinished;
