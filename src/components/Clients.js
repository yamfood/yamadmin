import React, { useEffect } from 'react';
import {
  Layout,
  Table,
  Switch,
  Button,
  Icon,
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import PhoneSearchForm from './PhoneSearchForm';
import pagination from './pagination';
import ClientDetails from './DisplayDetails';

const { Content } = Layout;

const actionsCreators = {
  getClients: actions.getClients,
  getClientDetails: actions.getClientDetails,
  setIsBlockedClient: actions.setIsBlockedClient,
};


const mapStateToProps = (state) => ({
  clients: state.clients,
});

const Clients = (props) => {
  const {
    clients,
    getClients,
    getClientDetails,
    setIsBlockedClient,
  } = props;

  useEffect(() => {
    if (clients.status === null) {
      getClients({ page: clients.page });
    }
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'TID',
      dataIndex: 'tid',
      key: 'tid',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Номер',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Блокирован',
      dataIndex: 'is_blocked',
      key: 'is_blocked',
      render: (blocked, client) => (
        <Switch
          defaultChecked={blocked === true}
          onChange={(checked) => setIsBlockedClient(client.id, { is_blocked: checked })}
        />
      ),
    },
  ];

  const loading = (clients.status === 'request' || clients.blockedStatus === 'request' || clients.detailsStatus === 'request');
  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Клиенты</h1>
        <Button style={{ marginBottom: 20 }} onClick={() => getClients({ page: 1 })}><Icon type="reload" /></Button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PhoneSearchForm getByPhone={getClients} />
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
            2,
            getClients,
            clients.page,
          )}
          expandedRowRender={(record) => (
            <ul>
              <ClientDetails dataToDisplay={clients.detailsData} id={record.id} />
            </ul>
          )}
          onExpand={(expanded, record) => {
            if (expanded) {
              getClientDetails(record.id);
            }
          }}
        />
      </Content>
    </Layout>
  )
};


export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(Clients));
