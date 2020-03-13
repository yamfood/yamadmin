import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
} from 'antd';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const actionsCreators = {
  getKitchens: actions.getKitchens,
};


const mapStateToProps = (state) => ({
  kitchens: state.kitchens,
});

const KitchensList = (props) => {
  const { kitchens, getKitchens } = props;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  useEffect(() => {
    getKitchens();
  }, []);

  const loading = kitchens.status === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Кухни</h1>
        <Button style={{ marginBottom: 20 }} onClick={getKitchens}><Icon type="reload" /></Button>
        <Button
          type="primary"
          onClick={() => {
            props.history.push('/kitchens/create/');
          }}
          style={{ marginLeft: 10 }}
        >
          Создать Кухню
        </Button>
        <Table
          size="small"
          columns={columns}
          loading={loading}
          dataSource={kitchens.list.map((kitchen) => ({ ...kitchen, key: kitchen.id }))}
          onRow={(record) => ({
            onClick: () => {
              props.history.push(`${record.id}/details/`);
            },
          })}
        />
      </Content>
    </Layout>
  )
};


export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(KitchensList));
