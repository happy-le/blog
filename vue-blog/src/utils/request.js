import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    "Content-Type": "application/json"
  }
});

// 请求拦截
service.interceptors.request.use(
  config => {
    console.log("请求拦截>>>>>>>>>>", config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    console.log("响应拦截<<<<<<<<<<", response);
    const res = response.data;
    return Promise.reject(res);
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
