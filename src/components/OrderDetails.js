/* eslint-disable */
import React, {useEffect} from 'react';
import {Layout, Descriptions, Tag, Table} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions'
import api from "../apiRoutes";


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
    getOrderDetails: actions.getOrderDetails
};


const OrderDetailsView = (props) => {
    const {order} = props;

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price.toLocaleString('ru'),
        }
        ,
        {
            title: 'Итого',
            dataIndex: 'total',
            key: 'total',
            render: (price) => price.toLocaleString('ru'),
        }
    ];

    const statusTag = (order) => {
        switch (order.status) {
            case 'new':
                return <Tag color="#108ee9">Новый</Tag>;
            case "onWay":
                return <Tag color="#F6F200">В пути</Tag>;
            case "onKitchen":
                return <Tag color="#F6F200">На кухне</Tag>;
            case "finished":
                return <Tag color="#00C01D">Завершен</Tag>;
            case "canceled":
                return <Tag color="#FF2D00">Отменен</Tag>;
            default:
                return <Tag color="red">{order.status}</Tag>;
        }
    };

    return (
        <div>
            <Descriptions title={"Заказ #" + order.id}
                          size={"small"}
                          column={4}
                          layout="vertical"
                          bordered>
                <Descriptions.Item label="Локация" span={2}>
                    <div id="map" style={{width: '100%', height: 250}}></div>
                </Descriptions.Item>
                <Descriptions.Item label="Адрес" span={2}>{order.address}</Descriptions.Item>
                <Descriptions.Item label="Комментарий" span={2}>
                    {order.comment ? order.comment : "Пусто..."}
                </Descriptions.Item>
                <Descriptions.Item label="Кухня" span={2}>{order.kitchen}</Descriptions.Item>
                <Descriptions.Item label="Клиент" span={1}>{order.name}</Descriptions.Item>
                <Descriptions.Item label="Телефон" span={1}>{order.phone}</Descriptions.Item>
                <Descriptions.Item label="Курьер" span={1}>
                    {order.rider_name ? order.rider_name : "Нет курьера"}
                </Descriptions.Item>
                <Descriptions.Item label="Телефон" span={1}>
                    {order.rider_phone ? order.rider_phone : "Нет курьера"}
                </Descriptions.Item>
                <Descriptions.Item label="Сумма" span={1}>
                    {order.total_sum.toLocaleString('ru')} сум
                </Descriptions.Item>
                <Descriptions.Item label="Статус" span={1}>
                    {statusTag(order)}
                </Descriptions.Item>
                <Descriptions.Item label="Тип оплаты" span={1}>
                    {order.payment == "cash" ? "Наличными" : "Картой"}
                </Descriptions.Item>
                <Descriptions.Item label="Создан в">{order.created_at}</Descriptions.Item>
            </Descriptions>

            <br/>
            <h3><strong>Продукты</strong></h3>
            <Table dataSource={order.products}
                   columns={columns}
                   size={"small"}
                   pagination={false}
                   footer={() => <div style={{textAlign: "right", paddingRight: 10}}>
                       Итого: {order.total_sum.toLocaleString('ru')} сум
                   </div>}
                   bordered/>
        </div>
    )
};


const OrderDetails = (props) => {
    const {
        order = null,
        getOrderDetails,
        match
    } = props;
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    useEffect(() => {
        const orderID = match.params.id;

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
                ? <OrderDetailsView order={order}/>
                : <h1>Loading...</h1>}
        </Layout.Content>
    )
};


export default withRouter(connect(
    mapStateToProps,
    actionsCreator
)(OrderDetails));
