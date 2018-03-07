import {MessageBox} from 'element-ui';
import axios from 'axios';

// axios.defaults.timeout = 1000;
// axios.defaults.baseURL = 'http://127.0.0.1:3000/';
// axios.defaults.baseURL =  process.env.BASE_URL;

axios.interceptors.request.use(config => {
  let appToken = localStorage.getItem('app_token');
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  if (appToken) {
    config.headers['token'] = appToken;
  }
  return config;
}, error => {
  MessageBox('连接超时', '系统提示', {
    confirmButtonText: '确定',
    type: 'error'
  });
  return Promise.reject(error);
});

axios.interceptors.response.use(res => {
  // 系统状态码
  let codeArr = ['auth-access'];
  if (res.headers && res.headers.token) {
    localStorage.setItem('app_token', res.headers.token);
  }
  if (res.data.status === undefined || res.data.status !== 'success') {
    if (res.data.code === 'unauthed') {
      res.data.code = 'unauthed';
    }
  }
  if (res.data && codeArr.indexOf(res.data.code) > -1) {
    res.data.status = 'success';
  } else {
    res.data.status = 'failed';
  }
  return res;
}, error => {
  if (error.response.status >= 400) {
    MessageBox('访问异常', '系统提示', {
      confirmButtonText: '确定',
      type: 'error'
    });
  }
});
export default axios;
