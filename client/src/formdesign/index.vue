<template>
  <div>
    <header>
      <h1 class="page-header">表单设计器</h1>
      <nav class="nav__son">
        <span id="selectuser_alert"><span class="selectuser-alert">请选择用户</span></span>
        <a href="javascript:" class="nav__son__a" id="selectuser">
          <span class="nav__son__a__icon nav__son__a__icon1"></span>
          选择用户
          <i class="pointer"></i>
        </a>
        <a href="javascript:" class="nav__son__a" id='newform'>
          <span class="nav__son__a__icon el-icon-plus newform"></span>
          新建表单
        </a>
        <a href="javascript:" class="nav__son__a" id='propertyform'>
          <span class="nav__son__a__icon nav__son__a__icon3"></span>
          表单属性
        </a>
        <a href="javascript:" class="nav__son__a" id='openform'>
          <span class="nav__son__a__icon nav__son__a__icon4"></span>
          打开表单
        </a>
        <a href="javascript:" class="nav__son__a" id="saveform_" @click="saveForm">
          <span class="nav__son__a__icon nav__son__a__icon5"></span>
          保存
        </a>
      </nav>
    </header>
    <div class="container">
      <el-col :span="3" class="panel">
        <el-menu class="plugin-list" background-color="#fafafb" text-color="#909399">
          <el-menu-item v-for="item in pluginList" :key="item.ORDER" :index="item.ORDER"
                        @click="execPlugin(item.TYPE)">
            <i class="form-icon" :class="item.ICON"></i>
            <span slot="title">{{item.NAME}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" class="panel">
        <p class="title_info">
          <el-tooltip effect="light" placement="top-start"
                      content="针对多业务系统时，自定义表单可以提供多个业务系统进行集中使用。此时建成的表单可以选择供哪个用户进行使用。">
            <span class="title_info_user">数据用户：</span>
          </el-tooltip>
          <a id="currentUser"></a>
          <span class="title_info_form">表单名称：</span>
          <a id="currentFormName"></a>
        </p>
        <div id="myFormDesign"></div>
      </el-col>
    </div>
  </div>
</template>

<script>
  import {saveFormdesignById} from '@/api/formdesign';

  let Base64 = require('js-base64');
  if (!Base64.decode) {
    Base64 = Base64.Base64;
  }
  export default {
    mounted() {
    },
    data() {
      return {
        pluginList: [
          {NAME: '文本框', ORDER: '1', TYPE: 'input', ICON: 'form-icon-input'},
          {NAME: '多行文本', ORDER: '2', TYPE: 'textarea', ICON: 'form-icon-textarea'},
          // {NAME: '数字输入框', ORDER: '1', TYPE: 'number', icon: 'form-icon-number'},
          {NAME: '下拉菜单', ORDER: '3', TYPE: 'select', ICON: 'form-icon-select'},
          {NAME: '单选框', ORDER: '4', TYPE: 'radio', ICON: 'form-icon-radio'},
          {NAME: '复选框', ORDER: '5', TYPE: 'checkbox', ICON: 'form-icon-checkbox'},
          // {NAME: '日期', ORDER: '4', TYPE: 'datefield', ICON: 'form-icon-date'},
          // {NAME: '图片', ORDER: '4', TYPE: 'img', ICON: 'form-icon-img'},
          // {NAME: '附件', ORDER: '4', TYPE: 'attachment', ICON: 'form-icon-attachment'},
          // {NAME: '金额', ORDER: '4', TYPE: 'money', ICON: 'form-icon-money'},
          {NAME: '列表控件', ORDER: '6', TYPE: 'inner_grid', ICON: 'form-icon-inner_grid'}
          // {NAME: '联系人', ORDER: '4', TYPE: 'contact', ICON: 'form-icon-contact'},
          // {NAME: '计算公式', ORDER: '4', TYPE: 'calculate', ICON: 'form-icon-calculate'}
        ],
        currentFormName: '',
        formDesignEditor: ''
      };
    },
    methods: {
      execPlugin(TYPE) {
        leipiFormDesign.exec(TYPE);
      },
      saveForm() {
        if (userFlag && formFlag) {
          let content = leipiEditor.getContent();
          let propStr = sessionStorage.getItem('current-form');
          if (propStr !== '') {
            let propJSON = JSON.parse(propStr);
            let params = {
              name: propJSON.NAME,
              content: Base64.encode(content),
              uuid: propJSON.UUID,
              ps: ' ',
              catalogid: propJSON.MODULEID,
              tablename: propJSON.TABLENAME,
              ptablename: propJSON.PTABLENAME,
              parseContent: Base64.encode(' ')
            };
            console.log(params.content);
            saveFormdesignById(params).then(res => {
              if (res.status === 'success') {
                this.$message.success('保存成功！');
              } else {
                this.$message.error(res.message);
              }
            }).catch(err => {
              this.$message.error(err.message);
            });
          }
        }
      }
    }
  };
</script>
<style scoped>
  .selectuser-alert {
    display: inline-block;
    width: 94px;
    text-align: left;
    background: url('/client/static/formdesign/image/引导.png') 74px no-repeat;
    background-size: 18px;
    color: #FF9800;
    animation-name: flash;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes flash {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }

  .page-header {
    margin-left: 36px;
    line-height: 56px;
    font-family: "Microsoft YaHei UI Light", serif;
    font-size: 22px;
    font-weight: normal;
    float: left;
    color: #909399;
  }

  .title_info {
    height: 55px;
    line-height: 55px;
    padding-left: 20px;
    font-size: 16px;
    color: #607D8B;
    background-color: #f5f5f5;
    border-bottom: 1px solid #999;
  }

  #currentFormName {
    margin-right: 20px;
    color: #48576a;
  }

  span.title_info_user {
    font-size: 14px;
    color: #20a0ff;
  }

  a#currentUser {
    color: #48576a;
  }

  span.title_info_form {
    margin-left: 20px;
    font-size: 14px;
    color: #20a0ff;
  }

  #myFormDesign {
    margin: 6px auto;
    width: 98%;
    height: calc(100vh - 56px - 56px - 12px);
  }

  .nav .nav__li a {
    width: 100%;
    height: 48px;
    display: block;
    text-align: center;
    line-height: 48px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 5px 5px 0 0;
    border: 1px solid #4e82c8;
    border-bottom: 0px;
    color: #fff;
    padding: 0;
    background: -webkit-linear-gradient(top, #304E78, #426b9e 100%);
    background: -o-linear-gradient(top, #304E78, #426b9e 100%);
    background: -moz-linear-gradient(top, #304E78, #426b9e 100%);
    background: linear-gradient(to top, #304E78, #426b9e 100%);
  }

  .nav__son {
    width: 100%;
    height: 55px;
    line-height: 55px;
    text-align: right;
    background: #fafafb;
    border-bottom: 1px solid #ddd;
  }

  .nav__son .nav__son__a {
    margin-right: 12px;
    padding: 0 10px;
    height: 39px;
    line-height: 39px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    color: #607D8B;
  }

  .nav__son .nav__son__a,
  .nav__son .nav__son__a:hover,
  .nav__son .nav__son__a:active,
  .nav__son .nav__son__a:visited {
    text-decoration: none;
  }

  .nav__son .nav__son__a:hover {
    background: rgba(255, 255, 255, 0.8);
    color: #333;
    border-radius: 5px;
  }

  .nav__son .nav__son__a[disabled] {
    background-color: #ccc;
    cursor: no-drop;
    border: 1px solid #ccc;
  }

  .nav__son__a__icon {
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: middle
  }

  .nav__son__a__icon1 {
    background: url(./img/icon.png) 0 -818px;
  }

  .nav__son__a:nth-child(2) .nav__son__a__icon {
    color: #f4745f;
  }

  .nav__son__a__icon3 {
    background: url(./img/icon.png) 0 -776px;
  }

  .nav__son__a__icon4 {
    background: url(./img/icon.png) 0 -689px;
  }

  .nav__son__a__icon5 {
    background: url(./img/icon.png) 0 -727px;
  }

  .newform {
    color: #79c498
  }

  .container {
    width: 100%;
    height: calc(100vh - 56px);
    background-color: #f5f5f5;
  }

  .container .panel {
    height: 100%;
  }

  .plugin-list {
    height: 100%;
  }

  .disabled {
    color: #ccc !important;
    cursor: not-allowed;
  }

  .form-icon {
    width: 48px;
    height: 48px;
    display: inline-block;
  }

  .form-icon-input {
    background: url('/client/static/formdesign/image/单行输入框.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-textarea {
    background: url('/client/static/formdesign/image/多行文本框.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-number {
    background: url('/client/static/formdesign/image/控件-数字输入框.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-select {
    background: url('/client/static/formdesign/image/下拉框.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-radio {
    background: url('/client/static/formdesign/image/单选框.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-checkbox {
    background: url('/client/static/formdesign/image/复选框.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-date {
    background: url('/client/static/formdesign/image/日期.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-img {
    background: url('/client/static/formdesign/image/图片.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-attachment {
    background: url('/client/static/formdesign/image/附件.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-money {
    background: url('/client/static/formdesign/image/金额.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-inner_grid {
    background: url('/client/static/formdesign/image/表格.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-contact {
    background: url('/client/static/formdesign/image/联系人.png') 20% no-repeat;
    background-size: 18px;
  }

  .form-icon-calculate {
    background: url('/client/static/formdesign/image/计算.png') 20% no-repeat;
    background-size: 18px;
  }
</style>
