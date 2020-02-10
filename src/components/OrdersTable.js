import React from "react";
import OrderCard from "./OrderCard";
import OrderCardSkeleton from "./OrderCardSkeleton";


const OrdersTable = ({orders, loading = true}) => {
    return (
        <div className="OrdersTable">
            {loading
                ? [1, 2, 3, 4].map(i => <OrderCardSkeleton/>)
                : orders.map(order =>
                    <OrderCard order={order}/>)}
        </div>
    )
};


export default OrdersTable;
