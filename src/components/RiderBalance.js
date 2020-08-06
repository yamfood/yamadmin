import React, { useEffect } from 'react';
import {
  Form,
  Layout,
} from 'antd';
import { useDispatch } from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';
import WithdrawForm from './RiderWithdraw';
import RiderDetails from './DisplayDetails';

const { Content } = Layout;

const RidersBalance = (props) => {
  const dispatch = useDispatch();
  const {
    match,
    riders,
  } = props;
  const riderID = match.params.id;

  useEffect(() => {
    dispatch(actions.getRiderDetails(riderID));
    dispatch(actions.setMenuActive(6));
  }, []);


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
    </div>
  );
}

const WrappedForm = Form.create()(RidersBalance);
export default WrappedForm;
