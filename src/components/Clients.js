import React, { useEffect } from 'react';
import {
  Layout,
  Table,
  Switch,
  Button,
  Icon,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import setTitle from './shared/setTitle';
import * as actions from '../actions';
import PhoneSearchForm from './PhoneSearchForm';
import pagination from './pagination';
import ClientDetails from './DisplayDetails';
import { contentStyle } from '../assets/style';

const { Content } = Layout;

const Clients = () => {
  const {
    getClients,
    getClientDetails,
    setIsBlockedClient,
  } = actions;
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  useEffect(() => {
    if (clients.status === null) {
      dispatch(getClients({ page: clients.page }));
    }
    dispatch(actions.setMenuActive(4));
  });

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'TID', dataIndex: 'tid', key: 'tid' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Номер', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Блокирован',
      dataIndex: 'is_blocked',
      key: 'is_blocked',
      render: (blocked, client) => (
        <Switch
          defaultChecked={blocked === true}
          onChange={(checked) => dispatch(setIsBlockedClient(client.id, { is_blocked: checked }))}
        />
      ),
    },
  ];

  const loading = [clients.status, clients.blockedStatus, clients.detailsStatus].includes('request');

  return (
    <>
      {setTitle('Клиенты')}
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
            expandedRowRender={(record) => (
              <ul>
                <ClientDetails dataToDisplay={clients.detailsData} id={record.id} />
              </ul>
            )}
            onExpand={(expanded, record) => {
              if (expanded) {
                dispatch(getClientDetails(record.id));
              }
            }}
          />
        </Content>
      </Layout>
    </>
  )
};

export default Clients;
