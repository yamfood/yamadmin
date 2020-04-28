import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Button,
  Popconfirm,
} from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import * as actions from '../actions';


const DisabledProducts = ({ id }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.kitchens);
  useEffect(() => {
    dispatch(actions.setMenuActive(2));
    dispatch(actions.getKitchenProducts(id));
  }, [])

  const {
    disabledProducts,
    productsDeleteStatus,
    detailStatus,
  } = product;
  const columns = [
    {
      title: 'Фото',
      dataIndex: 'thumbnail',
      name: 'thumbnail',
      render: (photo) => (<img alt="foto" src={photo} style={{ width: 100 }} />),
    },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    {
      title: 'Удалить',
      dataIndex: 'delete',
      key: 'delete',
      render: (arg, food) => (
        <Popconfirm
          title="Вы уверены в удалении?"
          onConfirm={() => dispatch(actions.deleteDisabledProduct(id, food.id))}
          okText="Да"
          cancelText="Нет"
        >
          <Button
            type="link"
          >
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      loading={[productsDeleteStatus, detailStatus].includes('request')}
      dataSource={disabledProducts.map((food) => ({ ...food, key: `${food.id}` }))}
    />
  );
};

export default DisabledProducts;
