import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
  Switch,
} from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';

import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';
import pagination from './pagination';
import PhoneSearchForm from './PhoneSearchForm';
import RiderDetails from './DisplayDetails';
import DepositForm from './RiderDeposit';
import setTitle from './shared/setTitle';

const { Content } = Layout;

const RidersList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const riders = useSelector((state) => state.riders);
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'TID', dataIndex: 'tid', key: 'tid' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => `+${text}`,
    },
    {
      title: 'Блокирован',
      dataIndex: 'is_blocked',
      key: 'is_blocked',
      render: (blocked, client) => (
        <Switch
          defaultChecked={blocked === true}
          onChange={(checked) => {
            dispatch(actions.editRider({ is_blocked: checked }, client.id))
          }}
        />
      ),
    },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (id, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              history.push(`/riders/${record.id}/edit`);
            }}
          >
            <EditOutlined />
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actions.getRiders({ page: riders.page }));
    dispatch(actions.setMenuActive(5));
  }, []);

  const loading = [
    riders.status,
    riders.riderDetailsStatus,
    riders.editRiderStatus,
    riders.depositStatus,
  ].includes('request');

  return (
    <>
      {setTitle('Курьеры')}
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Курьеры</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Button
                style={{ marginTop: 4 }}
                onClick={() => dispatch(actions.getRiders({ page: 1 }))}
              >
                <Icon type="reload" />
              </Button>
              <PhoneSearchForm onSubmit={actions.getRiders} />
              <Button
                type="primary"
                onClick={() => {
                  history.push('/riders/create/');
                }}
                style={{ marginTop: '1%' }}
              >
                Создать Курьера
              </Button>
            </div>
            <p style={{ marginRight: '1%', fontSize: 14, marginTop: '1%' }}>
              <b>Кол-во:  </b>
              {riders.total}
            </p>
          </div>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            dataSource={riders.list.map((rider) => ({
              ...rider,
              key: `${rider.id}`,
            }))}
            pagination={pagination(
              riders.total,
              15,
              actions.getRiders,
              riders.page,
              dispatch,
            )}
            expandedRowRender={(record) => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ul>
                  <RiderDetails dataToDisplay={riders.riderDetails} id={record.id} />
                </ul>
                <DepositForm
                  id={record.id}
                  editDeposit={actions.editDeposit}
                />
              </div>
            )}
            onExpand={(expanded, record) => {
              if (expanded) {
                dispatch(actions.getRiderDetails(record.id));
              }
            }}
          />
        </Content>
      </Layout>
    </>
  )
};

export default RidersList;
