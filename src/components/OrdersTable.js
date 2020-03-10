import React from 'react';
import OrderCard from './OrderCard';
import OrderCardSkeleton from './OrderCardSkeleton';


const OrdersTable = ({ orders, loading = true }) => (
  <div className="OrdersTable">
    {loading
      ? [1, 2, 3, 4].map((i) => <OrderCardSkeleton key={i} />)
      : orders.map((order) => <OrderCard key={order.id} order={order} />)}
  </div>
);

export default OrdersTable;
