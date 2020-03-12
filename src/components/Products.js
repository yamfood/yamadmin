import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
} from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const actionsCreators = {
  getProducts: actions.getProducts,
};


const mapStateToProps = (state) => ({
  products: state.products,
});

const Products = (props) => {
  const { history, products, getProducts } = props;

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
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text.toLocaleString('ru')} сум`,
    },
    {
      title: 'Калорийность',
      dataIndex: 'energy',
      key: 'energy',
      render: (text) => `${text} кКал`,
    },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (id, record) => (
        <span>
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              props.history.push(`/products/${record.id}/edit`);
            }}
          >
            <EditOutlined />
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getProducts();
  }, []);

  const loading = products.status === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Продукты</h1>
        <Button style={{ marginBottom: 20 }} onClick={getProducts}><Icon type="reload" /></Button>
        <Table
          size="small"
          columns={columns}
          loading={loading}
          dataSource={products.list.map((product) => ({ ...product, key: `${product.id}` }))}
          onRow={(r) => ({
            onClick: () => history.push(`/products/${r.id}`),
          })}
        />
      </Content>
    </Layout>
  )
};


export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(Products));
