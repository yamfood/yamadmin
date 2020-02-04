const host = 'http://localhost:666/api/admin';

export default {
    login: () => [host, 'auth/login/'].join('/'),
    users: () => [host, 'users/'].join('/'),
    products: () => [host, 'products/'].join('/'),
};