import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
  Popconfirm,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const actionsCreators = {
  getProducts: actions.getProducts,
  deleteProduct: actions.deleteProduct,
};


const mapStateToProps = (state) => ({
  products: state.products,
});

const Products = (props) => {
  const {
    history,
    products,
    getProducts,
    deleteProduct,
  } = props;

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
    {
      title: 'Удалить',
      dataIndex: 'delete',
      key: 'delete',
      render: (arg, record) => (
        <Popconfirm
          title="Вы уверены в удалении?"
          onConfirm={(e) => {
            e.stopPropagation();
            deleteProduct(record.id)
          }}
          onCancel={(e) => {
            e.stopPropagation();
          }}
          okText="Да"
          cancelText="Нет"
        >
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DeleteOutlined />
          </Button>
        </Popconfirm>
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button style={{ marginBottom: 20 }} onClick={getProducts}><Icon type="reload" /></Button>
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => {
                history.push('/products/create/');
              }}
            >
              Создать продукт
            </Button>
          </div>
          <p style={{ marginTop: 3 }}>
            <b>Кол-во: </b>
            {products.list.length}
          </p>
        </div>
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
