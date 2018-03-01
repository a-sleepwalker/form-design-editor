<template>
  <div class="wrap">
    <header>
      <nav class="nav__son">
        <span id="selectuser_alert"><span class="selectuser-alert" >请选择用户</span></span>
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
      <!-- <div class="row-fluid"> -->
        <el-col :span="4">
        <div class="left_nav">
          <div class="left_title">
            <span>控件库</span>
          </div>
          <ul>
            <li v-for="item in leftlist" :key="item.name" :class="item.icon">
              <a href="javascript:void(0);" :onclick="item.link" class="btn btn-link">{{item.NAME}}</a>
            </li>
          </ul>
        </div>
        </el-col>
        <el-col :span="20" class="wrap">
        <div class="right_box">
          <div class="right_title">
            <!-- <span class="title_text">表单设计区</span> -->
            <p class="title_info">
              <span class="title_info_user">数据用户<el-tooltip content="针对多业务系统时，自定义表单可以提供多个业务系统进行集中使用。此时建成的表单可以选择供哪个用户进行使用。" placement="bottom" effect="light"><i class="el-icon-information"></i></el-tooltip>：</span><a id="currentUser"></a>
              <span class="title_info_form">表单名称：</span><a id="currentFormName"></a>
            </p>
          </div>
          <input type="hidden" name="fields" id="fields" value="0">
          <div id="myFormDesign"></div>
        </div>
        </el-col>
      <!-- </div>end row -->

    </div><!--end container-->
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
    filters: {
      filterFormName(val) {
        return !val || val === '' ? '暂无打开表单' : '表单名称 : ' + val;
      }
    },
    data() {
      return {
        leftlist: [
          {NAME: '文本框', index: '0', link: "leipiFormDesign.exec('input');", icon: 'form-icon-input'},
          {NAME: '多行文本', index: '1', link: "leipiFormDesign.exec('textarea');", icon: 'form-icon-textarea'},
          {NAME: '数字输入框', index: '1', link: "leipiFormDesign.exec('number');", icon: 'form-icon-number'},
          {NAME: '下拉菜单', index: '2', link: "leipiFormDesign.exec('select');", icon: 'form-icon-select'},
          {NAME: '单选框', index: '3', link: "leipiFormDesign.exec('radio');", icon: 'form-icon-radio'},
          {NAME: '复选框', index: '4', link: "leipiFormDesign.exec('checkbox');", icon: 'form-icon-checkbox'},
          {NAME: '日期', index: '4', link: "leipiFormDesign.exec('datefield');", icon: 'form-icon-date'},
          {NAME: '图片', index: '4', link: "leipiFormDesign.exec('img');", icon: 'form-icon-img'},
          {NAME: '附件', index: '4', link: "leipiFormDesign.exec('attachment');", icon: 'form-icon-attachment'},
          {NAME: '金额', index: '4', link: "leipiFormDesign.exec('money');", icon: 'form-icon-money'},
          {NAME: '列表控件', index: '4', link: "leipiFormDesign.exec('inner_grid');", icon: 'form-icon-inner_grid'},
          {NAME: '联系人', index: '4', link: "leipiFormDesign.exec('contact');", icon: 'form-icon-contact'},
          {NAME: '计算公式', index: '4', link: "leipiFormDesign.exec('calculate');", icon: 'form-icon-calculate'}
        ],
        currentFormName: '',
        formDesignEditor: ''
      };
    },
    methods: {
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
  body {
    background: #eaeff2;
    font-size: 12px;
    height: 100%;
  }
  .wrap {
    height: 100%;
  }
  a, a:hover {
    text-decoration: none
  }
  .selectuser-alert {
    display: inline-block;
    width:94px;
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
@keyframes flash{
    0% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
}
.right_title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #999;
    padding-left: 20px;
    font-size: 16px;
    color: #607D8B;
    background-color: #f5f5f5;
}
.title_text {
  float: left;
}
.title_info {
  float: left;
  font-size: 14px;
  /* background-color: #ccc; */
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  margin: 5px 20px 0 0;
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
    color: #20a0ff;
}
  #myFormDesign {
    width: 98%;
    margin: 6px auto;
    height: calc(100% - 60px);
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

  .nav__son{width: 100%; padding-right: 0%; height: 40px; line-height: 38px; border-bottom: 1px solid #ddd; text-align: right; background: #eef1f6;}
.nav__son .nav__son__a{  text-align: center; padding: 0 10px; height: 28px; color: #607D8B; font-size: 14px; line-height: 28px; margin-right: 12px; display: inline-block;}
.nav__son .nav__son__a,
.nav__son .nav__son__a:hover,
.nav__son .nav__son__a:active,
.nav__son .nav__son__a:visited{ text-decoration:none;}
.nav__son .nav__son__a:hover{background: rgba(255, 255, 255, 0.8); color: #333; border-radius: 5px;}
.nav__son .nav__son__a[disabled]{background-color: #ccc;cursor:no-drop;border:1px solid #ccc;}
.nav__son__a__icon{ width:15px; height:15px; display:inline-block; vertical-align:middle }
.nav__son__a__icon1{ background:url(./img/icon.png) 0 -818px;}
.nav__son__a:nth-child(2) .nav__son__a__icon {color: #f4745f;}
.nav__son__a__icon3{ background:url(./img/icon.png) 0 -776px;}
.nav__son__a__icon4{ background:url(./img/icon.png) 0 -689px;}
.nav__son__a__icon5{ background:url(./img/icon.png) 0 -727px;}
.newform { color:#79c498}
  .container {
    width: 100%;
    height: calc(100vh - 90px);
    background-color: #f5f5f5;
  }
.disabled {
    color: #ccc !important;
    cursor: not-allowed;
}
  /*left*/
  .left_nav {
    width: 100%;
    height: 100%;
    float: left;
    border-right: 1px solid #ccc;
  }
  .left_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-indent: 1em;
    border-bottom: 1px solid #ccc;
    color: #607D8B;
    background-color: #ddd;
  }
  .left_nav ul {
    margin: 0;
  }

  .left_nav li {
    width: 100%;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #e5e5e5
  }

  .left_nav li a {
    padding: 0 0 0 35%;
    line-height: 39px;
    color: #585858;
    width: 70%;
    display: block;
    text-align: left;
  }

  .left_nav li:hover, .left_nav li.actived {
    color: #2B7DBC;
    background-color: #fff;
    /* background: url(img/icon.png) #fff no-repeat 182px -625px; */
  }

  .left_nav li:hover a, .left_nav li.actived a {
    text-decoration: none;
    font-weight: bold;
  }

  /*right*/
  .right_box {
    /* padding: 10px; */
    height: 100%;
    background-color: #ccc;
    background: url('/client/static/formdesign/image/bg.png');
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
  i {
    color: #00BCD4;
    cursor: pointer;
  }
</style>
