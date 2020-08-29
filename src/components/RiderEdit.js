import React, { useEffect } from 'react';
import {
  Form,
  Layout, Tabs,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';
import RiderEditForm from './RiderEditForm';
import RiderBalance from './RiderBalance';

const { Content } = Layout;
const { TabPane } = Tabs;

const RidersEdit = (props) => {
  const dispatch = useDispatch();
  const riders = useSelector((state) => state.riders);
  const [tab, setTab] = useQueryParam('tab', withDefault(StringParam, 'edit'))
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
        <Tabs type="card" activeKey={tab} animated onChange={setTab}>
          <TabPane tab="Редактировать" key="edit">
            <h1 style={{ textAlign: 'center', fontSize: 30 }}>Изменение курьера</h1>
            <RiderEditForm riders={riders} handleSubmit={handleSubmit} form={form} />
          </TabPane>
          <TabPane tab="Баланс" key="balance">
            <RiderBalance match={match} riders={riders} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}

const WrappedForm = Form.create()(RidersEdit);
export default WrappedForm;
