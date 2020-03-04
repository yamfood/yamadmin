import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
  Switch,
} from 'antd';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';
import pagination from './pagination';
import PhoneSearchForm from './PhoneSearchForm';
import RiderDetails from './DisplayDetails';

const { Content } = Layout;

const actionsCreators = {
  getRiders: actions.getRiders,
  getRiderDetails: actions.getRiderDetails,
  editRider: actions.editRider,
};


const mapStateToProps = (state) => ({
  riders: state.riders,
});

const RidersList = (props) => {
  const {
    riders,
    getRiders,
    getRiderDetails,
    editRider,
  } = props;

  const handleEdit = (details) => {
    props.history.push({
      pathname: '/riders/edit',
      state: details,
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'TID',
      dataIndex: 'tid',
      key: 'tid',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
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
          onChange={(checked) => editRider({ is_blocked: checked }, client.id)}
        />
      ),
    },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (id, record) => (
        <Button
          type="link"
          onClick={() => handleEdit(record)}
        >
          Изменить
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (riders.status === null) {
      getRiders({ page: riders.page });
    }
  });

  const loading = riders.status === 'request' || riders.riderDetailsStatus === 'request' || riders.editRiderStatus === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Курьеры</h1>
        <Button style={{ marginBottom: 20 }} onClick={() => getRiders({ page: 1 })}><Icon type="reload" /></Button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PhoneSearchForm getByPhone={getRiders} />
          <Button
            type="primary"
            onClick={() => {
              props.history.push('/riders/create/');
            }}
          >
            Создать Курьера
          </Button>
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
            2,
            getRiders,
            riders.page,
          )}
          expandedRowRender={(record) => (
            <ul>
              <RiderDetails dataToDisplay={riders.riderDetails} id={record.id} />
            </ul>
          )}
          onExpand={(expanded, record) => {
            if (expanded) {
              getRiderDetails(record.id)
            }
          }}
        />
      </Content>
    </Layout>
  )
};


export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(RidersList));
