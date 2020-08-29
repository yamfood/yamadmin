import React, { useEffect } from 'react';
import { Form, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';
import moment from 'moment'
import * as actions from '../actions';
import WithdrawForm from './RiderWithdraw';
import RiderDetails from './DisplayDetails';

const RidersBalance = (props) => {
  const dispatch = useDispatch();
  const [{ page, size }, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
    size: withDefault(NumberParam, 10),
  });
  const {
    match,
    riders,
  } = props;

  const riderID = match.params.id;
  const { logs, total } = useSelector((state) => state.riders.riderBalanceLogs);
  const loading = useSelector((state) => state.riders.riderBalanceLogsStatus) === 'request'

  useEffect(() => {
    dispatch(actions.getRiderDetails(riderID));
    dispatch(actions.setMenuActive(6));
  }, []);


  useEffect(() => {
    dispatch(actions.getRiderBalanceLogs(riderID, size, (page - 1) * size));
  }, [page, size])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Админ',
      dataIndex: 'admin_name',
      render: (adminName, log) => log.admin_id && `${adminName} @${log.admin_login}`,

    },
    {
      title: 'Дата',
      dataIndex: 'created_at',
      align: 'center',
      render: (date) => moment(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      align: 'right',
      render: (amount) => `${amount} сум`,
    },
  ];
  const tableChange = ({ current, pageSize }) => setQuery({ size: pageSize, page: current })
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: 30 }}>Баланс</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ul>
          <RiderDetails dataToDisplay={riders.riderDetails} id={riderID} />
        </ul>
        <WithdrawForm
          id={riderID}
          riderWithdraw={actions.riderWithdraw}
        />
      </div>
      <hr />
      <Table
        columns={columns}
        rowKey={(log) => log.id}
        dataSource={logs}
        pagination={
          {
            current: page,
            pageSize: size,
            pageSizeOptions: ['10', '30', '50', '100'],
            showSizeChanger: true,
            total,
          }
        }
        loading={loading}
        onChange={tableChange}
      />
    </div>
  );
}

const WrappedForm = Form.create()(RidersBalance);
export default WrappedForm;
