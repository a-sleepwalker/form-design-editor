import { Loading, MessageBox } from 'element-ui';
import axios from 'axios';
// axios.defaults.baseURL = 'http://127.0.0.1:3000/';
// axios.defaults.baseURL =  process.env.BASE_URL;
var loadinginstace;
axios.interceptors.request.use(config => {
  // element ui Loading方法
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  // loadinginstace = Loading.service({ fullscreen: true }); //暂时关闭
  let idtAppToken = localStorage.getItem('idt_App_token');
  if (idtAppToken) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers['token'] = idtAppToken;
  }
  if (config.url.indexOf('/oApp/login') > -1 ||
    config.url.indexOf('/web/qyglOrYhglRegister') > -1 ||
    config.url.indexOf('/web/webSaveForm') > -1 ||
    config.url.indexOf('/web/webCheckCode') > -1 ||
    config.url.indexOf('/webAdmin/getUserAndCompanyManagerInfo') > -1 ||
    config.url.indexOf('/webAdmin/updateUserAndCompanyInfo') > -1 ||
    config.url.indexOf('/webAdmin/getMyLoginList') > -1 ||
    config.url.indexOf('/webAdmin/webSaveMyForm') > -1 ||
    config.url.indexOf('/webAdmin/userPhotoUpload') > -1 ||
    config.url.indexOf('/web/webSendCode') > -1 ||
    config.url.indexOf('/webAdmin/webSendCode') > -1 ||
    config.url.indexOf('/web/webSendMailCode') > -1 ||
    config.url.indexOf('web/getWebSetPwd') > -1 ||
    config.url.indexOf('/web/loginByTel') > -1 ||
    config.url.indexOf('web/getWebSetPwd') > -1) {
    let idtAppKey = localStorage.getItem('idt_App_key');
    if (idtAppKey) {
      config.headers['codeKey'] = idtAppKey;
    }
  }
  return config;
}, error => {
  // loadinginstace.close();  //暂时关闭
  MessageBox('加载超时!', '系统消息', {
    confirmButtonText: '确定',
    type: 'error'
  });
  return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
  let codeArr = ['idt-core-200', 'idt-oApp-3000', 'idt-oApp-3100', 'idt-oApp-3200', 'idt-oApp-3210', 'idt-oApp-5000', 'idt-sms-5000', 'idt-org-200', 'idt-formdesign-5000'];
  // loadinginstace.close(); //暂时关闭
  if (res.headers && res.headers.token) {
    localStorage.setItem('idt_App_token', res.headers.token);
  }
  if (res.data.status === undefined || res.data.status !== 'success') {
    if (res.data.code === 'idt-core-505' && (res.data.message === '票据信息不能为空' || res.data.message === '您的登录已经失效！' || res.data.message === '票据已经失效')) {
      res.data.code = 'idt-jwt-500';
    }
    if (res.data && codeArr.indexOf(res.data.code) > -1
    ) {
      res.data.status = 'success';
    } else {
      if (res.data && (res.data.code === 'idt-jwt-503' || res.data.code === 'idt-jwt-501' || res.data.code === 'idt-core-100' || res.data.code === 'idt-jwt-502' || res.data.code === 'idt-jwt-500')) {
        // alert("用于分析:如出现错误，请截图 "+res.data.code);
        // 判断是否过期，针对在线咨询、投诉
        let adminPages = ['zxts/wyzx/index.html', 'zxts/wyts/index.html', 'zxts/jydj/index.html', 'wsbs/sxsbdj/index.html', 'qlqd/xzqlqddetail/index.html', 'wsbs/hyyydj/index.html'];
        let locationhref = window.location.href;
        let locationflag = false;
        for (let page of adminPages) {
          if (locationhref.indexOf(page) > -1) {
            locationflag = true;
            break;
          }
        };
        if (!locationflag) {
          window.location.href = '/user/login/index.html';
        }
      }
      // 防止二进制流
      if (res.data.code) {
        res.data.status = 'false';
      }
    }
  }
  return res;
}, function (error) {
  // loadinginstace.close();  //暂时关闭
  if (error.response.status >= 400) {
    MessageBox('访问异常!', '系统消息', {
      confirmButtonText: '确定',
      type: 'error'
    });
  }
});
export default axios;
