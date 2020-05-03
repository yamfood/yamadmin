import React, { useEffect, useState } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
  Popconfirm,
  Input,
  Cascader,
  Select,
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

const { Option } = Select;
const { Content } = Layout;

const Products = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const food = useSelector((state) => state.products);
  const { list } = food;
  const [products, setProducts] = useState([]);
  const [names, setNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProductStatus, setCategoryProductStatus] = useState();
  const [nameStatus, setNametatus] = useState();

  const filter = () => {
    if (food.botsList) {
      return [
        { value: 'all', label: 'Все' },
        ...food.botsList.map((product) => ({
          value: product.id,
          label: product.name,
          children: food.categories.reduce((acc, curVal) => {
            if (curVal.bot_id === product.id) {
              return [
                ...acc,
                {
                  value: curVal.id,
                  label: `${curVal.name} ${curVal.emoji}`,
                },
              ];
            }
            return acc;
          }, []),
        })),
      ];
    }
    return [];
  }

  const nameSearch = ({ target }) => {
    if (categoryProductStatus === 'not found') {
      setProducts([]);
      return null;
    }
    if (target.value) {
      if (categoryProductStatus === 'found') {
        const filteredCategory = categories.filter(
          (product) => product.name.toLowerCase().includes(target.value.toLowerCase()),
        );
        if (filteredCategory.length === 0) {
          setNametatus('not found');
          setProducts([]);
          return null;
        }
        setNames(filteredCategory);
        setProducts(filteredCategory);
        return null;
      }
      const filteredCategory = list.filter(
        (product) => product.name.toLowerCase().includes(target.value.toLowerCase()),
      );
      if (filteredCategory.length === 0) {
        setNametatus('not found');
        setProducts([]);
        return null;
      }
      setNames(filteredCategory);
      setProducts(filteredCategory);
      return null;
    }
    if (categoryProductStatus === 'found') {
      const filteredCategory = categories.filter(
        (product) => product.name.toLowerCase().includes(target.value.toLowerCase()),
      );
      if (filteredCategory.length === 0) {
        setNametatus('not found');
        setProducts([]);
        return null;
      }
      setNames(filteredCategory);
      setProducts(filteredCategory);
      return null;
    }
    setNames('all');
    setProducts(list);
    return null;
  };

  const categorySearch = (categoryId) => {
    if (categoryId[0] === 'all') {
      setCategoryProductStatus('all');
    }
    if (nameStatus === 'found') {
      const filteredCategory = names.filter(
        (product) => product.category_id === categoryId[1],
      );
      setCategoryProductStatus('found');
      setCategories(filteredCategory);
      setProducts(filteredCategory);
      return null;
    }
    const filteredCategory = list.filter(
      (product) => product.category_id === categoryId[1],
    );
    if (filteredCategory.length === 0) {
      setCategoryProductStatus('not found');
      setProducts([]);
      return null;
    }
    setCategoryProductStatus('found');
    setCategories(filteredCategory);
    setProducts(filteredCategory);
    return null;
  };


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

  useEffect(() => {
    dispatch(actions.setMenuActive(3));
    dispatch(actions.getBotsId());
    if (products.length === 0) {
      dispatch(actions.getProducts());
    }
    setProducts(list);
    dispatch(actions.getCategory());
  }, [list]);

  const loading = products.status === 'request';

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
              options={filter()}
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
