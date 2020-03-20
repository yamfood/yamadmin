import axios from 'axios';

export const httpClient = axios.create();

httpClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {...config.headers, token}
    }

    return config;
  },
  error => Promise.reject(error)
);