import React from "react";
import {Card, Icon, Statistic} from 'antd';

const {Meta} = Card;
const { Countdown } = Statistic;


const OrderCard = () => {
    const deadline = Date.now() + 1000 * 60 * 30; // Moment is also OK

    return (
        <Card
            style={{width: 300, marginBottom: 40}}
            actions={[
                <Icon type="monitor" />,
                <Icon type="ellipsis" key="ellipsis"/>,
            ]}
        >
            <Meta
                title="# 31"
            /><br/>
            <strong>Рустам</strong> <br/>
            🥗 1 x Яблочный фреш <br/>
            🥗 1 x Сырники со сметаной и джемом <br/>
            💰 24 900 сум (Наличными) <br/><br/>
            <Countdown value={deadline} format="mm:ss"/>
        </Card>
    )
};


export default OrderCard;