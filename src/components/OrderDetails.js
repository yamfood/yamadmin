/* eslint-disable */
import React, {useEffect} from "react";
import {Layout} from "antd";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../actions'


const mapStateToProps = (state, ownProps) => {
    return {
        order: (state.orderDetails[ownProps.match.params.id] || null)
    }
};


const actionsCreator = {
    getOrderDetails: actions.getOrderDetails
};


const OrderDetails = (props) => {
    const {order = null, getOrderDetails, match} = props;

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    useEffect(() => {
        const orderID = match.params.id;

        if (order === null) {
            getOrderDetails(orderID);
            return
        }

        mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNHprbnVicTBiZG8zbW1xMW9hYjQ5dTkifQ.h--Xl_6OXBRSrJuelEKH8g';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/kensay/ck52ch6ji00o41ctc1n49mnc8',
            center: [69.2401, 41.2995],
            zoom: 11
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
                minHeight: 280,
            }}
        >
            {order !== null
                ? <div className="detail">
                    <h1 style={{fontSize: 40, textAlign: "center"}}>Заказ #{order.id}</h1>
                    <div className="order-detail">
                        <div style={{width: '35%'}}>
                            <h3>Информация</h3>
                            <p>Клиент: {order.name}</p>
                            <p>Телефон: +{order.phone}</p>
                            <p>Комментарий: {order.comment}</p>
                            <p>Статус: {order.status}</p>
                            <p>Сумма: {order.total_sum.toLocaleString('ru')} сум</p>
                            <p>Создан: {order.created_at}</p>
                            <br/>
                            <h3>Продукты</h3>
                            {order.products.map(p => <p>{p.name} | {p.price} | {p.count}</p>)}
                        </div>
                        <div id='map' style={{width: '65%', height: 500}}/>
                    </div>
                </div>
                : <h1>Loading...</h1>}
        </Layout.Content>
    )
};


export default withRouter(connect(
    mapStateToProps,
    actionsCreator
)(OrderDetails));