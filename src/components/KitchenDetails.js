import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layout,
  Descriptions,
} from 'antd';
import * as actions from '../actions';

const { Content } = Layout;

const KitchenDetail = (props) => {
  const dispatch = useDispatch();
  const kitchen = useSelector((state) => state.kitchens);
  const { match } = props;
  const { details } = kitchen;

  useEffect(() => {
    const kitchenId = match.params.id;
    dispatch(actions.getKitchenDetails(kitchenId));
  }, []);

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Детали Кухни</h1>
        <Descriptions title="Кухня" bordered="trute">
          <Descriptions.Item label="Название">{details ? details.name : null}</Descriptions.Item>
          <Descriptions.Item label="Долгота(longitude)">{details ? details.location.longitude : null}</Descriptions.Item>
          <Descriptions.Item label="Широта(latitude)">{details ? details.location.latitude : null}</Descriptions.Item>
        </Descriptions>
      </Content>
    </Layout>
  );
};

export default withRouter(KitchenDetail);
