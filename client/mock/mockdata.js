let mockData = {
  path: '/eform/',
  data: {}
};

/** formdesign */
mockData.data['getAuthorUserList'] = require('./formdesign/getAuthorUserList');
mockData.data['getDesignformInfoList'] = require('./formdesign/getDesignformInfoList');
mockData.data['deleteDesignformInfo'] = require('./formdesign/deleteDesignformInfo');
mockData.data['saveFormdesignById'] = require('./formdesign/saveFormdesignById');
mockData.data['getFormdesignById'] = require('./formdesign/getFormdesignById');
mockData.data['getCatalogList'] = require('./formdesign/getCatalogList');
mockData.data['getTablesByCataId'] = require('./formdesign/getTablesByCataId');
mockData.data['getEformLibs'] = require('./formdesign/getEformLibs');
mockData.data['saveDesignformLib'] = require('./formdesign/saveDesignformLib');
mockData.data['saveDesignformLibsFL'] = require('./formdesign/saveDesignformLibsFL');
mockData.data['deleteDesignformLibs'] = require('./formdesign/deleteDesignformLibs');
mockData.data['deleteDesignformFL'] = require('./formdesign/deleteDesignformFL');

module.exports = mockData;
