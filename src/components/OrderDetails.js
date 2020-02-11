import React, {useEffect} from "react";

import {Layout} from "antd";


const detail = {
    total_cost: 9900,
    total_energy: 360,
    phone: 998909296339,
    products: [
        {
            name: "Яблочный фреш",
            price: 9900,
            count: 1
        }
    ],
    name: "Рустам Бабаджанов",
    total_sum: 9900,
    status: "onWay",
    id: 1,
    comment: "Тест",
    location: {
        longitude: 69.299141,
        latitude: 41.341993
    },
    created_at: "2020-02-06T05:03:10Z"
};


const OrderDetails = () => {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNHprbnVicTBiZG8zbW1xMW9hYjQ5dTkifQ.h--Xl_6OXBRSrJuelEKH8g';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/kensay/ck52ch6ji00o41ctc1n49mnc8',
            center: [69.2401, 41.2995],
            zoom: 11
        });

        new mapboxgl.Marker()
            .setLngLat([detail.location.longitude, detail.location.latitude])
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
            <h1 style={{fontSize: 40, textAlign: "center"}}>Заказ #{detail.id}</h1>
            <div className="order-detail">
                <div style={{width: '35%'}}>
                    <h3>Информация</h3>
                    <p>Клиент: {detail.name}</p>
                    <p>Телефон: +{detail.phone}</p>
                    <p>Комментарий: {detail.comment}</p>
                    <p>Статус: {detail.status}</p>
                    <p>Сумма: {detail.total_sum.toLocaleString('ru')} сум</p>
                    <p>Создан: {detail.created_at}</p>
                    <br/>
                    <h3>Продукты</h3>
                    {detail.products.map(p => <p>{p.name} | {p.price} | {p.count}</p>)}
                </div>
                <div id='map' style={{width: '65%', height: 500}}/>
            </div>
            <div className="order-products">

            </div>
        </Layout.Content>
    )
};


export default OrderDetails;