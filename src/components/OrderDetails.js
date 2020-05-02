/* eslint-disable */
import React, { useEffect } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import {
  Layout,
} from 'antd';
import { withRouter, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions'
import Title from './shared/Title';
import api from "../apiRoutes";

const { Content } = Layout;

import OrderDetailsView from './OrderDetailsView';
import formWrap from './wrappers/formWrapper';

const mapStateToProps = (state, ownProps) => ({
  editedState: state.orderDetails.editedState,
});

const openViewSocket = (orderID) => {
  try {
    const url = api.viewOrderSocket().replace('http', 'ws');
    const socket = new WebSocket(url);
    socket.onopen = () => {
      const data = JSON.stringify({
        token: localStorage.getItem('token'),
        order: orderID,
      });
      socket.send(data)
    };
    return socket;
  } catch (error) {
    console.error(error);
  }
};


const actionsCreator = {
  getOrderDetails: actions.getOrderDetails,
  setMenuActive: actions.setMenuActive
};


const OrderDetails = (props) => {
  const { id } = useParams();
  const order = useSelector((state) => (state.orderDetails[id] || null));
  const editStatus = useSelector((state) => state.orderDetails.editStatus);
  const editedState = useSelector((state) => state.orderDetails.editedState);

  const dispatch = useDispatch();

  const { form } = props;

  useEffect(() => {
    dispatch(actions.setMenuActive(7));
    dispatch(actions.getOrderDetails(id));
    dispatch(actions.getAvailableProducts(id));

    const socket = openViewSocket(id);

    return () => {
      socket.close()
    }
  }, [dispatch]);

  useEffect(() => {
    if (order === null) {
      return
    }

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNHprbnVicTBiZG8zbW1xMW9hYjQ5dTkifQ.h--Xl_6OXBRSrJuelEKH8g';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/kensay/ck52ch6ji00o41ctc1n49mnc8',
      center: [69.2401, 41.2995],
      zoom: 10
    });

    new mapboxgl.Marker()
      .setLngLat([order.location.longitude, order.location.latitude])
      .addTo(map);
  }, [order, id, dispatch]);

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          height: '95vh',
          overflow: 'auto',
        }}
      >
        {order !== null
          ? <OrderDetailsView order={order} editStatus={editStatus} editedState={editedState} form={form} />
          : <h1>Loading...</h1>}
      </Content>
    </Layout>
  )
};


export default withRouter(formWrap(OrderDetails));
