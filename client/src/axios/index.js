import {MessageBox} from 'element-ui';
import axios from 'axios';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/';

axios.interceptors.request.use(config => {
  let appToken = localStorage.getItem('app_token');
  if (appToken) {
    config.headers['token'] = appToken;
  }
  if (config.url.indexOf('') > -1) {
    let appKey = localStorage.getItem('app_key');
    if (appKey) {
      config.headers['codeKey'] = appKey;
    }
  }
  return config;
}, error => {
  // TODO confirm text
  MessageBox('time out', 'ops', {
    confirmButtonText: '确定',
    type: 'error'
  });
  return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
  let codeArr = [''];
  if (res.headers && res.headers.token) {
    localStorage.setItem('app_token', res.headers.token);
  }
  if (res.data.status === undefined || res.data.status !== 'success') {
    if (res.data.code === '') {
      res.data.code = 'unauthed';
    }
  }
  if (res.data && codeArr.indexOf(res.data.code) > -1) {
    res.data.status = 'success';
  } else {
    // todo code
    if (res.data && res.data.code === 'app-503') {
      // todo redirect
      let redirect = ['/'];
      let _href = window.location.href;
      let flag = false;
      for (let page of redirect) {
        if (_href.indexOf(page) > -1) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        window.location.href = '/index.html';
      }
      if (res.data.code) {
        res.data.status = 'false';
      }
    }
  }
  return res;
}, error => {
  if (error.response.status >= 400) {
    // TODO confirm text
    MessageBox('访问异常', 'ops', {
      confirmButtonText: '确定',
      type: 'error'
    });
  }
});
export default axios;
