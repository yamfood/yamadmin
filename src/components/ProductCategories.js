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
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Title from './shared/Title';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const ProductCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const category = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(actions.setMenuActive(3));
    dispatch(actions.getCategory());
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Бот', dataIndex: 'bot', key: 'bot' },
    { title: 'Эмоджи', dataIndex: 'emoji', key: 'emoji' },
    {
      title: 'Доставка',
      dataIndex: 'is_delivery_free',
      key: 'is_delivery_free',
      render: (text) => {
        if (text) {
          return <span style={{ color: 'green' }}>Бесплатно</span>
        }
        return null;
      },
    },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (arg, record) => (
        <span>
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={`/products/categories/${record.id}/edit/`}
          >
            <EditOutlined />
          </Link>
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
            dispatch(actions.deleteCategory(record.id))
          }}
          okText="Да"
          cancelText="Нет"
        >
          <DeleteOutlined style={{ color: '#1890ff' }} />
        </Popconfirm>
      ),
    },
  ];


  return (
    <>
      <Title headTitle="Категория" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Категории</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Button style={{ marginBottom: 20 }} onClick={() => dispatch(actions.getCategory())}><Icon type="reload" /></Button>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={() => history.push('/products/categories/create/')}
              >
                Создать категорию
              </Button>
            </div>
            <p style={{ marginTop: 3 }}>
              <b>Кол-во: </b>
              {category.list.length}
            </p>
          </div>
          <Table
            size="small"
            columns={columns}
            loading={category.getRequestStatus === 'request'}
            dataSource={category.list.map((product) => ({ ...product, key: `${product.id}` }))}
          />
        </Content>
      </Layout>
    </>
  )
};


export default ProductCategory;
