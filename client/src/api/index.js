import axios from '@/axios';
import qs from 'qs';
import {MessageBox} from 'element-ui';

function messageBox(message) {
  MessageBox(message, '系统消息', {
    confirmButtonText: '确定',
    type: 'error'
  });
}

export const getArci = () => {
  return axios.post('/back/getArci').then(res => res.data);
};

export const getU = (params) => {
  if (!params) {
    messageBox('nullable');
  }
  return axios.post('/back/getU', qs.stringify(params)).then(res => res.data);
};
