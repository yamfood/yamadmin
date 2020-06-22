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
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
  const [productStateFilter, setProductStateFilter] = useState(() => (product) => product);
  const [nameFilter, setNameFilter] = useState(() => (product) => product);

  const [products, setProducts] = useState([]);

  const filterBotChoices = () => [
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


  const productStateChoices = [
    {
      value: 0,
      label: 'Все',
    },
    {
      label: 'Незавершённые',
      value: null,
    },
  ];


  const nameSearch = ({ target }) => {
    if (target.value) {
      setNameFilter(
        () => (product) => product
          .name
          .toLowerCase()
          .includes(target.value.toLowerCase())
          || product
            .groupModifiers
            .reduce((acc, group) => [...acc, ...group.modifiers
              .map((m) => m.name.toLowerCase())], [])
            .includes(target.value.toLowerCase()),
      );
      return
    }

    setNameFilter(() => (product) => product);
  };

  const productStateSearch = (selected) => {
    const state = selected[0];

    if (state === 0) {
      setProductStateFilter(() => (product) => product);
      return
    }
    if (state === null) {
      setProductStateFilter(() => (product) => product.category_id == null
        || !product.thumbnail
        || !product.photo);
    }
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
    setProducts(list.filter(nameFilter).filter(categoryFilter).filter(productStateFilter))
  }, [list, nameFilter, categoryFilter, productStateFilter]);

  const columns = [
    {
      title: 'Фото',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 100,
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

  const expandIcon = (props) => {
    const {
      expanded, record, onExpand, prefixCls,
    } = props;
    const cls = expanded ? 'ant-table-row-expanded' : 'ant-table-row-collapsed';

    if (record.groupModifiers.length > 0) {
      return (
        <button
          tabIndex={0}
          type="button"
          onClick={onExpand}
          className={`${prefixCls} ant-table-row-expand-icon ${cls}`}
        />
      )
    }
    return []
  }


  const expandedModifierGroup = (product) => {
    const { groupModifiers } = product;

    const modifierGroupColumns = [
      {
        title: 'Груп ID',
        dataIndex: 'id',
        key: 'id',
      },
      { title: 'Обязательное', dataIndex: 'required', key: 'required' },
    ];

    const expandedModifier = (group) => {
      const { modifiers } = group;
      const modifierColumns = [
        { title: 'Название', dataIndex: 'name', key: 'name' },
        {
          title: 'Цена',
          dataIndex: 'price',
          key: 'price',
          render: (text) => `${text.toLocaleString('ru')} сум`,
        },
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
      return (
        <Table
          key={`${group.id}_table`}
          pagination={false}
          columns={modifierColumns}
          dataSource={modifiers.map((m) => ({ ...m, key: m.id }))}
        />
      )
    }

    return (
      <Table
        key={`${product.id}_table`}
        pagination={false}
        columns={modifierGroupColumns}
        expandedRowRender={expandedModifier}
        dataSource={groupModifiers.map((gm) => ({ ...gm, key: gm.id }))}
      />
    )
  };

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
              <Button style={{ marginBottom: 20 }} onClick={() => dispatch(actions.getProducts())}>
                <Icon
                  type="reload"
                />
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={() => history.push('/products/create/')}
              >
                Создать продукт
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => dispatch(actions.syncProducts())}
              >
                Синхронизировать
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
              options={filterBotChoices()}
              onChange={categorySearch}
              defaultValue={[0]}
              allowClear={false}
            />
            <Cascader
              style={{ marginLeft: 10, width: 150 }}
              options={productStateChoices}
              onChange={productStateSearch}
              defaultValue={[0]}
              allowClear={false}
            />
          </div>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            defaultExpandAllRows
            expandedRowRender={expandedModifierGroup}
            expandIcon={expandIcon}
            dataSource={products.map((product) => ({ ...product, key: `${product.id}` }))}
          />
        </Content>
      </Layout>
    </>
  )
};


export default Products;
