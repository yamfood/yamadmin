import React from "react";
import OrderCard from "./OrderCard";


const OrdersTable = () => {
    return (
        <div className="OrdersTable">
            {Array(10).fill(1).map(v =>
            <OrderCard/>)}
        </div>
    )
};


export default OrdersTable;
