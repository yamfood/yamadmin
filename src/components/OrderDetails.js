/* eslint-disable */
import React, { useEffect } from 'react';
import { Layout, Descriptions, Tag, Table } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import Title from './shared/Title';
import api from "../apiRoutes";
import OrderDetailView from './OrderDetailView';


const mapStateToProps = (state, ownProps) => ({
  order: (state.orderDetails[ownProps.match.params.id] || null)
});


const openViewSocket = async (orderID) => {
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
    } catch (error) {
        console.error(error);
    }
};


const actionsCreator = {
  getOrderDetails: actions.getOrderDetails,
  setMenuActive: actions.setMenuActive
};



const OrderDetails = (props) => {
  const {
    order = null,
    getOrderDetails,
    match,
    setMenuActive,
  } = props;
  const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  useEffect(() => {
    const orderID = match.params.id;
    setMenuActive(8);

    if (order === null) {
      getOrderDetails(orderID);
      return
    }

    openViewSocket(orderID);

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
  });

  return (
    <Layout.Content
      style={{
        margin: '24px 16px',
        padding: 24,
        background: '#fff',
        minHeight: 'auto',
      }}
    >
      {order !== null
        ? <OrderDetailView order={order} />
        : <h1>Loading...</h1>}
    </Layout.Content>
  )
};


export default withRouter(connect(
  mapStateToProps,
  actionsCreator
)(OrderDetails));
