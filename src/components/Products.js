import React, { useEffect, useState } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
  Popconfirm,
  Input,
  Cascader,
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

const Products = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productsState = useSelector((state) => state.products);
  const { list } = productsState;

  const [categoryFilter, setCategoryFilter] = useState(() => (product) => product);
  const [nameFilter, setNameFilter] = useState(() => (product) => product);

  const [products, setProducts] = useState([]);

  const filterChoices = () => [
    {
      value: 0,
      label: 'Все',
    },
    ...productsState.botsList.map((bot) => ({
      value: bot.id,
      label: bot.name,
      children: [
        {
          value: 0,
          label: 'Все',
        },
        ...productsState.categories.reduce((acc, category) => {
          if (category.bot_id === bot.id) {
            return [
              ...acc,
              {
                value: category.id,
                label: `${category.name} ${category.emoji}`,
              },
            ];
          }
          return acc;
        }, []),
      ],
    })),
  ];

  const nameSearch = ({ target }) => {
    if (target.value) {
      setNameFilter(
        () => (product) => product.name.toLowerCase().includes(target.value.toLowerCase()),
      );
      return
    }

    setNameFilter(() => (product) => product);
  };

  const categorySearch = (selected) => {
    const botID = selected[0];
    const categoryID = selected[1];

    if (botID === 0) {
      setCategoryFilter(() => (product) => product);
      return
    }

    if (categoryID === 0) {
      setCategoryFilter(() => (product) => product.bot_id === botID);
      return;
    }

    setCategoryFilter(() => (product) => product.category_id === categoryID);
  };


  useEffect(() => {
    dispatch(actions.setMenuActive(4));
    dispatch(actions.getBotsId());
    dispatch(actions.getProducts());
    dispatch(actions.getCategory());
  }, [dispatch]);


  useEffect(() => {
    setProducts(list.filter(nameFilter).filter(categoryFilter))
  }, [list, nameFilter, categoryFilter]);

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
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={`/products/${record.id}/edit`}
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

  const loading = productsState.status === 'request';

  return (
    <>
      <Title headTitle="Продукты" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Продукты</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
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
            <Cascader
              style={{ marginLeft: 10, width: 250 }}
              options={filterChoices()}
              onChange={categorySearch}
              defaultValue={['all']}
              allowClear={false}
            />
          </div>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            dataSource={products.map((product) => ({ ...product, key: `${product.id}` }))}
          />
        </Content>
      </Layout>
    </>
  )
};


export default Products;
