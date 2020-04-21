import React, { useEffect } from 'react';
import {
  Layout,
  Table,
  Button,
  Icon,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { contentStyle } from '../assets/style';
import pagination from './pagination';
import * as actions from '../actions';

const { Content } = Layout;

const Announcements = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const announcements = useSelector((state) => state.announcements);
  const { advertisements } = announcements;

  useEffect(() => {
    dispatch(actions.getAnnouncements());
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Фото',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (image) => <img alt="" style={{ width: 100 }} src={image} />,
    },
    { title: 'Текст', dataIndex: 'text', key: 'text' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    {
      title: 'Отправить',
      dataIndex: 'send_at',
      key: 'send_at',
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (arg, advertisement) => (
        <span>
          <Button
            type="link"
            onClick={() => history.push(`/announcements/${advertisement.id}/edit/`)}
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
      render: () => <Button type="link"><DeleteOutlined /></Button>,
    },
  ]

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Объявления</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <Button
              style={{ marginBottom: 20 }}
              onClick={() => dispatch(actions.getAnnouncements({ page: 1 }))}
            >
              <Icon type="reload" />
            </Button>
            <Button
              type="primary"
              onClick={() => {
                history.push('/announcements/create/');
              }}
              style={{ marginLeft: 10 }}
            >
              Создать Объявления
            </Button>
          </div>
          <p style={{ marginRight: '1%', fontSize: 14, marginTop: '1%' }}>
            <b>Кол-во:  </b>
            {announcements.count}
          </p>
        </div>
        <Table
          columns={columns}
          loading={announcements.listStatus === 'request'}
          dataSource={advertisements.map((adv) => ({ ...adv, key: `${adv.id}` }))}
          pagination={pagination(
            announcements.count,
            15,
            actions.getAnnouncements,
            announcements.page,
            dispatch,
          )}
        />
      </Content>
    </Layout>
  )
};

export default Announcements;
