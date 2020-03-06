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
import DepositForm from './RiderDeposit';

const { Content } = Layout;

const actionsCreators = {
  getRiders: actions.getRiders,
  getRiderDetails: actions.getRiderDetails,
  editRider: actions.editRider,
  editDeposit: actions.editDeposit,
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
    editDeposit,
  } = props;

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
          onChange={(checked) => {
            editRider({ params: { is_blocked: checked }, id: client.id })
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
              props.history.push(`/riders/${record.id}/edit`);
            }}
          >
            Изменить
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getRiders({ page: riders.page });
  }, []);

  const loading = [
    riders.status,
    riders.riderDetailsStatus,
    riders.editRiderStatus,
    riders.depositStatus,
  ].includes('request');

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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ul>
                <RiderDetails dataToDisplay={riders.riderDetails} id={record.id} />
              </ul>
              <DepositForm
                id={record.id}
                editDeposit={editDeposit}
              />
            </div>
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
