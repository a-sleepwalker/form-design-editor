/**
 * @description : 配置本地服务，如果开启了代理模式，该接口将不进行调用。
 */

let mockData = {
  path: '',
  data: {}
};

mockData.data['/back/getU'] = require('./blog/getU');

module.exports = mockData;
