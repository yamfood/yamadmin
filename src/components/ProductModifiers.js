import React, { useEffect, useState } from 'react';
import {
  Button, Icon, Layout, Table, Input,
} from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Title from './shared/Title';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const ProductModifiers = () => {
  const dispatch = useDispatch();
  const modifiersState = useSelector((state) => state.modifiers);
  const { list } = modifiersState;
  const [nameFilter, setNameFilter] = useState(() => (modifier) => modifier);

  const [modifiers, setModifiers] = useState([]);

  const nameSearch = ({ target }) => {
    if (target.value) {
      setNameFilter(
        () => (modifier) => modifier.name.toLowerCase().includes(target.value.toLowerCase())
          || modifier.products.some((product) => product?.name?.toLowerCase()
            .includes(target.value.toLowerCase())),
      );
      return
    }

    setNameFilter(() => (modifier) => modifier);
  };


  useEffect(() => {
    dispatch(actions.setMenuActive(5));
    dispatch(actions.getModifiers());
  }, [dispatch]);


  useEffect(() => {
    setModifiers(list.filter(nameFilter))
  }, [list, nameFilter]);


  const expandedRowRender = (modifier) => {
    const productColumns = [
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
        align: 'right',
        render: (id, record) => (
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={`/products/${record.id}/edit`}
          >
            <EditOutlined />
          </Link>
        ),
      },
    ];
    return (
      <Table
        key={`${modifier.id}_table`}
        columns={productColumns}
        dataSource={modifier.products.map((product) => ({ ...product, key: `${product.id}` }))}
      />
    );
  };


  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text.toLocaleString('ru')} сум`,
    },
    { title: 'group_id', dataIndex: 'group_id', key: 'group_id' },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      align: 'right',
      render: (id, record) => (
        <span>
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={`modifiers/${record.id}/edit`}
          >
            <EditOutlined />
          </Link>
        </span>
      ),
    },
  ];

  const loading = modifiersState.status === 'request';

  return (
    <>
      <Title headTitle="Модификаторы" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Модификаторы</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Button style={{ marginBottom: 20 }} onClick={() => dispatch(actions.getModifiers())}><Icon type="reload" /></Button>
            </div>
            <p style={{ marginTop: 3 }}>
              <b>Кол-во: </b>
              {list.length}
            </p>
          </div>
          <div style={{
            display: 'flex',
            marginBottom: 20,
          }}
          >
            <Input
              onChange={nameSearch}
              placeholder="Поиск по названию..."
              style={{ width: 400 }}
            />
          </div>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            defaultExpandAllRows
            expandedRowRender={expandedRowRender}
            dataSource={modifiers.map((modifier) => ({ ...modifier, key: `${modifier.id}` }))}
          />
        </Content>
      </Layout>
    </>
  )
};


export default ProductModifiers;
