/* eslint-disable */
import React from "react";
import {Card, Icon, Statistic} from 'antd';

const {Meta} = Card;
const {Countdown} = Statistic;


const OrderCard = ({order}) => {

    const deadline = new Date(order.created_at).getTime() + 1000 * 60 * 60 * 10;

    return (
        <Card
            style={{width: 300, margin: 10}}
            actions={[
                <Icon type="eye" onClick={() => window.open(`/orders/${order.id}/`, "_blank")}/>,
                <Icon type="ellipsis"/>
            ]}
        >
            <Meta
                title={`# ${order.id}`}
            /><br/>
            😃<strong>{order.name}</strong> <br/>
            📞+{order.phone} <br/><br/>


            💰{order.total_sum.toLocaleString("ru")} сум <br/>
            💬{order.comment} <br/><br/>
            <Countdown prefix="⏱️" value={deadline} format="mm:ss"/>
        </Card>
    )
};


export default OrderCard;