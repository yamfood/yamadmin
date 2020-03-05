/* eslint-disable */
import React, { useEffect } from "react";
import { Button, Icon, Layout, Table } from 'antd';

import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from "../actions";

const { Content } = Layout;

const actionsCreators = {
  getAdmins: actions.getAdmins,
};


const mapStateToProps = (state) => {
  return {
    admins: state.admins,
  }
};

const AdminsList = (props) => {

  const { admins, getAdmins } = props;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login'
    },
    {
      title: 'Токент',
      dataIndex: 'token',
      key: 'token'
    },
  ];

  useEffect(() => {
    if (admins.status === null) {
      getAdmins();
    }
  });

  const loading = admins.status === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: "center" }}>Администраторы</h1>
        <Button style={{ marginBottom: 20 }} onClick={getAdmins}><Icon type="reload" /></Button>
        <Table
          size={"small"}
          columns={columns}
          loading={loading}
          dataSource={admins.list} />
      </Content>
    </Layout>
  )
};


export default connect(
  mapStateToProps,
  actionsCreators
)(withRouter(AdminsList));
