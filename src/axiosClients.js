// import axios from 'axios'

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_CLIENT
// })

// instance.interceptors.request.use(function (config) {
//     let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.accessToken
//     if (token) config.headers = {
//         authorization: token
//     }
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

// export default instance

import axios from "axios";
import queryString from "query-string";
const axiosClients = axios.create({
  baseURL: process.env.REACT_APP_CLIENT,
});

axiosClients.interceptors.request.use(async (config) => {
  let token =
    window.localStorage.getItem("persist:auth") &&
    JSON.parse(window.localStorage.getItem("persist:auth"))?.accessToken;
  if (token) token = token.slice(1, token.length - 1);
  config.headers = {
    authorization: token,
  };
  return config;
});

axiosClients.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClients;
