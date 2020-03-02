import React, { useEffect } from 'react';
import {
  Button, Icon, Layout, Table,
} from 'antd';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';
import pagination from './pagination';
import PhoneSearchForm from './PhoneSearchForm';

const { Content } = Layout;

const actionsCreators = {
  getRiders: actions.getRiders,
  getRiderDetails: actions.getRiderDetails,
};


const mapStateToProps = (state) => ({
  riders: state.riders,
});

const RidersList = (props) => {
  const {
    riders,
    getRiders,
    // riderDetails,
    getRiderDetails,
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
  ];

  useEffect(() => {
    if (riders.status === null) {
      getRiders({ page: riders.page });
    }
  });

  const displayDetails = (recordId) => {
    if (riders.riderDetails[recordId]) {
      return (
        <ul>
          <li key={riders.riderDetails[recordId].id}>
            <b>id:</b>
            {riders.riderDetails[recordId].id}
          </li>
          <li key={riders.riderDetails[recordId].tid}>
            <b>tid:</b>
            {riders.riderDetails[recordId].tid}
          </li>
          <li key={riders.riderDetails[recordId].name}>
            <b>name:</b>
            {riders.riderDetails[recordId].name}
          </li>
          <li key={riders.riderDetails[recordId].phone}>
            <b>phone:</b>
            {riders.riderDetails[recordId].phone}
          </li>
          <li key={riders.riderDetails[recordId].notes}>
            <b>notes:</b>
            {riders.riderDetails[recordId].notes}
          </li>
          <li key={riders.riderDetails[recordId].is_blocked}>
            <b>is_blocked:</b>
            {riders.riderDetails[recordId].is_blocked}
          </li>
          <li key={riders.riderDetails[recordId].deposit}>
            <b>deposit:</b>
            {riders.riderDetails[recordId].deposit}
          </li>
        </ul>
      );
    }
    return null;
  };

  const loading = riders.status === 'request' || riders.riderDetailsStatus === 'request';

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
          expandedRowRender={(record) => displayDetails(record.id)}
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
