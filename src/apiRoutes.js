const host = `${process.env.REACT_APP_API_HOST}/api/admin`;

export default {
  login: () => [host, 'auth/login/'].join('/'),
  clients: () => [host, 'clients/'].join('/'),
  kitchens: () => [host, 'kitchens/'].join('/'),
  products: () => [host, 'products/'].join('/'),
  riders: () => [host, 'riders/'].join('/'),
  orderDetails: (id) => [host, `orders/${id}/`].join('/'),
  clientDetails: (id) => [host, `clients/${id}/`].join('/'),
  orders: () => [host, 'orders/active/'].join('/'),
  cancelOrder: (id) => [host, `orders/${id}/cancel/`].join('/'),
  admins: () => [host, 'admins/'].join('/'),
  riderDetails: (id) => [host, `riders/${id}/`].join('/'),
  riderDeposit: (id) => [host, `riders/${id}/deposit/`].join('/'),
};
