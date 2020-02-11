const host = `${process.env.REACT_APP_API_HOST}/api/admin`;

export default {
    login: () => [host, 'auth/login/'].join('/'),
    users: () => [host, 'users/'].join('/'),
    kitchens: () => [host, 'kitchens/'].join('/'),
    products: () => [host, 'products/'].join('/'),
    riders: () => [host, 'riders/'].join('/'),
    orders: () => [host, 'orders/active/'].join('/'),
    admins: () => [host, 'admins/'].join('/'),
};