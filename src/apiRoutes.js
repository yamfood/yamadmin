const host = `${process.env.REACT_APP_API_HOST}/api/admin`;

export default {
    login: () => [host, 'auth/login/'].join('/'),
    users: () => [host, 'users/'].join('/'),
    products: () => [host, 'products/'].join('/'),
};