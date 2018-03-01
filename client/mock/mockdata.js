/**
 * @description : 配置本地服务，如果开启了代理模式，该接口将不进行调用。
 */

let mockData = {
  path: '',
  data: {}
};

/** formdesign */
mockData.data['eform/getAuthorUserList'] = require('./formdesign/getAuthorUserList');
mockData.data['eform/getDesignformInfoList'] = require('./formdesign/getDesignformInfoList');
mockData.data['eform/deleteDesignformInfo'] = require('./formdesign/deleteDesignformInfo');
mockData.data['eform/saveFormdesignById'] = require('./formdesign/saveFormdesignById');
mockData.data['eform/getFormdesignById'] = require('./formdesign/getFormdesignById');
mockData.data['eform/getCatalogList'] = require('./formdesign/getCatalogList');
mockData.data['eform/getTablesByCataId'] = require('./formdesign/getTablesByCataId');
mockData.data['eform/getEformLibs'] = require('./formdesign/getEformLibs');
mockData.data['eform/saveDesignformLib'] = require('./formdesign/saveDesignformLib');
mockData.data['eform/saveDesignformLibsFL'] = require('./formdesign/saveDesignformLibsFL');
mockData.data['eform/deleteDesignformLibs'] = require('./formdesign/deleteDesignformLibs');
mockData.data['eform/deleteDesignformFL'] = require('./formdesign/deleteDesignformFL');

module.exports = mockData;
