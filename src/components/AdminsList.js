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
import { useDispatch, useSelector } from 'react-redux';
import Title from './shared/Title';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const AdminsList = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const history = useHistory();
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Логин', dataIndex: 'login', key: 'login' },
    { title: 'Токен', dataIndex: 'token', key: 'token' },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (id, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              dispatch(actions.getAdminEditDetails(record));
              history.push(`/admins/${record.id}/edit/`);
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
          onConfirm={() => dispatch(actions.deleteAdmin(record.id))}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="link"><DeleteOutlined /></Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actions.getAdmins());
    dispatch(actions.setMenuActive(9));
  }, []);

  const loading = admins.status === 'request' || admins.deleteAdminStatus === 'request';

  return (
    <>
      <Title headTitle="Администраторы" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Администраторы</h1>
          <Button
            style={{ marginBottom: 20 }}
            onClick={() => dispatch(actions.getAdmins())}
          >
            <Icon type="reload" />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push('/admins/create/');
            }}
            style={{ marginLeft: 10 }}
          >
            Создать администратора
          </Button>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            dataSource={admins.list.map((user) => ({
              ...user,
              key: `${user.id}`,
            }))}
            pagination={false}
            expandedRowRender={(admin) => {
              const { payload } = admin;
              const { permissions } = payload;
              return (
                <div style={{ display: 'flex' }}>
                  <p><b>Доступ:</b></p>
                  <ul>
                    {permissions ? permissions.map((permission) => <li>{permission}</li>) : null}
                  </ul>
                </div>
              );
            }}
          />
        </Content>
      </Layout>
    </>
  )
};

export default AdminsList;
