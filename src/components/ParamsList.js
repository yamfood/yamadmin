import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
} from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';
import Title from './shared/Title';
import ParamEditModal from './ParamEditModal';

const { Content } = Layout;

const ParamsList = () => {
  const dispatch = useDispatch();
  const params = useSelector((state) => state.params);
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Значение', dataIndex: 'value', key: 'value' },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (arg, record) => (
        <span>
          <Button
            type="link"
            onClick={() => dispatch(actions.openSettingModal(record))}
          >
            <EditOutlined />
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actions.getParams());
    dispatch(actions.setMenuActive(12));
  }, []);

  const loading = [
    params.listStatus,
  ].includes('request');

  return (
    <>
      <Title headTitle="Настройки" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Настройки</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <ParamEditModal />
              <Button
                style={{ marginTop: 4 }}
                onClick={() => dispatch(actions.getParams())}
              >
                <Icon type="reload" />
              </Button>
            </div>
            <p style={{ marginRight: '1%', fontSize: 14, marginTop: '1%' }}>
              <b>Кол-во:  </b>
              {params.list.length}
            </p>
          </div>

          <Table
            size="small"
            columns={columns}
            loading={loading}
            pagination={false}
            dataSource={params.list.map((rider) => ({
              ...rider,
              key: `${rider.id}`,
            }))}
          />
        </Content>
      </Layout>
    </>
  )
};

export default ParamsList;
