import React, { useEffect } from 'react';
import {
  Form,
  Layout,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';
import RiderEditForm from './RiderEditForm';

const { Content } = Layout;

const RidersEdit = (props) => {
  const dispatch = useDispatch();
  const riders = useSelector((state) => state.riders);
  const {
    form,
    match,
  } = props;


  useEffect(() => {
    const riderID = match.params.id;
    dispatch(actions.getRiderDetails(riderID));
    dispatch(actions.setMenuActive(6));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const { editRiderDetails } = riders;
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editRider(
          {
            ...values,
          },
          editRiderDetails.id,
        ));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>Изменение курьера</h1>
        <RiderEditForm riders={riders} handleSubmit={handleSubmit} form={form} />
      </Content>
    </Layout>
  );
}

const WrappedForm = Form.create()(RidersEdit);
export default WrappedForm;
