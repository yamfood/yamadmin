import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
} from 'antd';
import moment from 'moment';
import {
  EditOutlined,
} from '@ant-design/icons';

import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';
import Title from './shared/Title';

const { Content } = Layout;

const KitchensList = () => {
  const dispatch = useDispatch();
  const kitchens = useSelector((state) => state.kitchens);
  const history = useHistory();

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Бот', dataIndex: 'bot', key: 'bot' },
    {
      title: 'Открывается',
      dataIndex: 'start_at',
      key: 'start_at',
      render: (time) => moment(time).format('HH:mm'),
    },
    {
      title: 'Закрывается',
      dataIndex: 'end_at',
      key: 'end_at',
      render: (time) => moment(time).format('HH:mm'),
    },
    {
      title: 'Отключен',
      dataIndex: 'is_disabled',
      key: 'is_disabled',
      render: (bool) => (bool ? <p style={{ color: 'red' }}>Отключен</p> : null),
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
            to={`/kitchens/${record.id}/edit/`}
          >
            <EditOutlined />
          </Link>
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actions.getKitchens());
    dispatch(actions.setMenuActive(2));
  }, []);

  const loading = kitchens.status === 'request';

  return (
    <>
      <Title headTitle="Кухни" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Кухни</h1>
          <Button style={{ marginBottom: 20 }} onClick={() => dispatch(actions.getKitchens())}><Icon type="reload" /></Button>
          <Button
            type="primary"
            onClick={() => {
              history.push('/kitchens/create/');
            }}
            style={{ marginLeft: 10 }}
          >
            Создать кухню
          </Button>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            dataSource={kitchens.list.map((kitchen) => ({ ...kitchen, key: kitchen.id }))}
          />
        </Content>
      </Layout>
    </>
  )
};


export default KitchensList;
