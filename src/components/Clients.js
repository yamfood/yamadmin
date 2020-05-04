import React, { useEffect } from 'react';
import {
  Layout,
  Table,
  Button,
  Icon,
} from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Title from './shared/Title';
import * as actions from '../actions';
import PhoneSearchForm from './PhoneSearchForm';
import pagination from './pagination';
import { contentStyle } from '../assets/style';

const { Content } = Layout;

const Clients = () => {
  const {
    getClients,
  } = actions;
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getClients({ page: clients.page }));
    dispatch(actions.setMenuActive(5));
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'TID', dataIndex: 'tid', key: 'tid' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Номер', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Блокирован',
      dataIndex: 'is_blocked',
      key: 'is_blocked',
      render: (blocked) => {
        if (blocked) {
          return <span style={{ color: 'red' }}>Блокирован</span>
        }
        return null;
      },
    },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (arg, client) => (
        <span>
          <Link
            to={`/clients/${client.id}/`}
          >
            <EditOutlined />
          </Link>
        </span>
      ),
    },
  ];

  const loading = [clients.status, clients.blockedStatus, clients.detailsStatus].includes('request');

  return (
    <>
      <Title headTitle="Клиенты" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Клиенты</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Button style={{ marginBottom: 20, marginTop: '1%' }} onClick={() => dispatch(getClients({ page: 1 }))}><Icon type="reload" /></Button>
              <PhoneSearchForm onSubmit={getClients} />
            </div>
            <p style={{ marginRight: '1%', fontSize: 14, marginTop: '1%' }}>
              <b>Кол-во:</b>
              {clients.total}
            </p>
          </div>
          <Table
            size="small"
            columns={columns}
            dataSource={clients.list.map((client) => (
              {
                ...client,
                key: `${client.id}`,
              }
            ))}
            loading={loading}
            pagination={pagination(
              clients.total,
              15,
              getClients,
              clients.page,
              dispatch,
            )}
          />
        </Content>
      </Layout>
    </>
  )
};

export default Clients;
