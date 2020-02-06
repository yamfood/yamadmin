import React from "react";
import OrderCard from "./OrderCard";


const OrdersTable = ({orders}) => {
    return (
        <div className="OrdersTable">
            {orders.map(order =>
            <OrderCard order={order}/>)}
        </div>
    )
};


export default OrdersTable;
