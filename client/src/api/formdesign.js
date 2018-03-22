import axios from '@/axios';
import qs from 'qs';
import {MessageBox} from 'element-ui';

// 获取用户列表
export const getAuthorUserList = () => {
  return axios.post('/eform/getAuthorUserList').then(res => res.data);
};

// 获取通用字段列表
export const getCommonColumnList = (params) => {
  let param = {};
  if (!params.tablename) {
    MessageBox('【tablename】参数不能为空');
  } else {
    param.tablename = params.tablename;
  }
  return axios.post('/eform/getCommonColumnList', qs.stringify(param)).then(res => res.data);
};
// 获取自定义表单信息
export const getFormdesignById = (params) => {
  let param = {};
  if (!params.uuid) {
    MessageBox('【uuid】参数不能为空');
  } else {
    param.uuid = params.uuid;
  }
  return axios.post('/eform/getFormdesignById', qs.stringify(param)).then(res => res.data);
};
/**
 * 保存自定义表单
 * @param {*} params
 */
export const saveFormdesignById = (params) => {
  let param = {};
  if (!params.name) {
    MessageBox('【name】参数不能为空');
  } else {
    param.name = params.name;
  }
  if (!params.content) {

  } else {
    param.content = params.content;
  }
  if (params.uuid) {
    param.uuid = params.uuid;
  }
  if (params.ps) {
    param.ps = params.ps;
  }
  if (params.tablename) {
    param.tablename = params.tablename;
  }
  if (params.ptablename) {
    param.ptablename = params.ptablename;
  }
  if (params.catalogid) {
    param.catalogid = params.catalogid;
  }
  if (params.parseContent) {
    param.parseContent = params.parseContent;
  }
  return axios.post('/eform/saveFormdesignById', qs.stringify(param)).then(res => res.data);
};

/**
 *  获取自定义表单列表
 */
export const getDesignformInfoList = () => {
  return axios.post('/eform/getDesignformInfoList').then(res => res.data);
};

/***
 * 删除自定义表信息
 */
export const deleteDesignformInfo = (params) => {
  let param = {};
  if (!params) {
    MessageBox('【uuid】参数不能为空');
  } else {
    param.params = JSON.stringify(params);
  }
  return axios.post('/eform/deleteDesignformInfo', qs.stringify(param)).then(res => res.data);
};

/***
 * 更新自定义表单名
 */
export const updateDesignformName = (params) => {
  let param = {};
  if (!params.uuid) {
    MessageBox('【uuid】参数不能为空');
  } else {
    param.uuid = params.uuid;
  }
  if (!params.name) {
    MessageBox('【name】参数不能为空');
  } else {
    param.name = params.name;
  }
  return axios.post('/eform/updateDesignformName', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取模块列表
 */
export const getCatalogList = () => {
  return axios.post('/eform/getCatalogList').then(res => res.data);
};
/**
 * 根据模块获取主表
 */
export const getTablesByCataId = params => {
  let param = {};
  if (!params.catalogId) {
    MessageBox('【catalogId】 不能为空');
  } else {
    param.catalogId = params.catalogId;
  }
  return axios.post('/eform/getTablesByCataId', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取当前函数库下的分类列表
 */
export const getEformLibs = params => {
  if (params) {
    let param = {};
    if (params.fluuid) {
      param.fluuid = params.fluuid;
      return axios.post('/eform/getEformLibs', qs.stringify(param)).then(res => res.data);
    }
  } else {
    return axios.post('/eform/getEformLibs').then(res => res.data);
  }
};
/**
 * 添加更新函数库树
 */
export const saveDesignformLib = params => {
  let param = {};
  if (params) {
    param.paramjson = JSON.stringify(params);
  }
  return axios.post('/eform/saveDesignformLib', qs.stringify(param)).then(res => res.data);
};
/**
 * 添加更新函数库树分类
 */
export const saveDesignformLibsFL = params => {
  let param = {};
  if (params) {
    param.paramjson = JSON.stringify(params);
  }
  return axios.post('/eform/saveDesignformLibsFL', qs.stringify(param)).then(res => res.data);
};
/**
 * 删除函数库树
 */
export const deleteDesignformLibs = params => {
  let param = {};
  if (params) {
    param.uuid = JSON.stringify(params);
  }
  return axios.post('/eform/deleteDesignformLibs', qs.stringify(param)).then(res => res.data);
};
/**
 * 删除函数库树分类
 */
export const deleteDesignformFL = params => {
  let param = {};
  if (params) {
    param.uuid = JSON.stringify(params);
  }
  return axios.post('/eform/deleteDesignformFL', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取字段信息列表
 */
export const getFieldsInfoByFieldAttachTableList = params => {
  let param = {};
  if (params) {
    param.fieldAttachTable = params;
  }
  param.nowPage = 1;
  param.pageSize = 50;
  return axios.post('/eform/getFieldsInfoByFieldAttachTableList', qs.stringify(param)).then(res => res.data);
};
/** ===================================================================== */

/**
 * 取函数名
 */
export const getFnNameById = params => {
  let param = {};
  if (params.uuid) {
    param.uuid = params.uuid;
  }
  return axios.post('/eform/getFnNameById', qs.stringify(param)).then(res => res.data);
};
