import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Layout,
  Descriptions,
} from 'antd';
import * as actions from '../actions';

const { Content } = Layout;

const mapStateToProps = (state) => ({
  kitchen: state.kitchens,
});

const actionCreators = {
  getKitchenDetails: actions.getKitchenDetails,
}

const KitchenDetail = (props) => {
  const {
    kitchen,
    getKitchenDetails,
    match,
  } = props;
  const { details } = kitchen;
  useEffect(() => {
    const kitchenId = match.params.id;
    getKitchenDetails(kitchenId);
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

export default connect(
  mapStateToProps,
  actionCreators,
)(withRouter(KitchenDetail));
