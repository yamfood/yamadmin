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

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const Products = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state) => state.products);

  const columns = [
    {
      title: 'Фото',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => <img alt={thumbnail} style={{ width: 100 }} src={thumbnail} />,
    },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
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
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (category, product) => {
        if (category) {
          return `${product.emoji} ${category}`;
        }
        return null;
      },
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
              history.push(`/products/${record.id}/edit`);
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
          onConfirm={() => {
            dispatch(actions.deleteProduct(record.id))
          }}
          okText="Да"
          cancelText="Нет"
        >
          <DeleteOutlined style={{ color: '#1890ff' }} />
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);

  const loading = products.status === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 'auto',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Продукты</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button style={{ marginBottom: 20 }} onClick={() => dispatch(actions.getProducts())}><Icon type="reload" /></Button>
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => history.push('/products/create/')}
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
        />
      </Content>
    </Layout>
  )
};


export default Products;
