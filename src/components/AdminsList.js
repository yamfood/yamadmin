import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
  Popconfirm,
} from 'antd';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const actionsCreators = {
  getAdmins: actions.getAdmins,
  deleteAdmin: actions.deleteAdmin,
};


const mapStateToProps = (state) => ({
  admins: state.admins,
});

const AdminsList = (props) => {
  const {
    admins,
    getAdmins,
    deleteAdmin,
  } = props;

  const confirm = (id) => {
    deleteAdmin(id);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'Токен',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: 'Удалить',
      dataIndex: 'delete',
      key: 'delete',
      render: (arg, record) => (
        <Popconfirm
          title="Вы уверены в удалении?"
          onConfirm={() => confirm(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="link">Удалить</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    getAdmins();
  }, []);

  const loading = admins.status === 'request' || admins.deleteAdminStatus === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Администраторы</h1>
        <Button style={{ marginBottom: 20 }} onClick={getAdmins}><Icon type="reload" /></Button>
        <Table
          size="small"
          columns={columns}
          loading={loading}
          dataSource={admins.list}
        />
      </Content>
    </Layout>
  )
};


export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(AdminsList));
