import React, { useEffect } from 'react';
import {
  Layout, Table, Tag,
} from 'antd';
import { withRouter, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as actions from '../actions'
import api from '../apiRoutes';

const { Content } = Layout;

const openViewSocket = (orderID) => {
  try {
    const url = api.viewOrderSocket().replace('http', 'ws');
    const socket = new WebSocket(url);
    socket.onopen = () => {
      const data = JSON.stringify({
        token: localStorage.getItem('token'),
        order: orderID,
      });
      socket.send(data)
    };
    return socket;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const statuses = {
  new: <Tag color="#108ee9">Новый</Tag>,
  onWay: <Tag color="#F6F200">В пути</Tag>,
  onKitchen: <Tag color="#F6F200">На кухне</Tag>,
  finished: <Tag color="#00C01D">Завершен</Tag>,
  canceled: <Tag color="#FF2D00">Отменен</Tag>,
};


const OrderLogs = () => {
  const { id } = useParams();
  const status = useSelector((state) => state.orderDetails.logsStatus);
  const logs = useSelector((state) => state.orderDetails.logs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setMenuActive(7));
    dispatch(actions.getOrderLogs(id));

    const socket = openViewSocket(id);

    return () => {
      socket.close()
    }
  }, [dispatch]);

  const columns = [
    {
      title: 'Время',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt) => moment.utc(createdAt).local().format('DD.MM.YYYY HH:mm:ss'),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (s) => statuses[s],
    },
    { title: 'Доп. Информация', dataIndex: 'info', key: 'info' },
  ];

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          height: '95vh',
          overflow: 'auto',
        }}
      >
        <Link to={`/orders/${id}/`}>Назад</Link>
        <h1>
          Заказ #
          { id }
        </h1>
        <Table
          size="small"
          pagination={false}
          columns={columns}
          loading={status === 'request'}
          dataSource={logs}
        />
      </Content>
    </Layout>
  )
};

export default withRouter(OrderLogs);
