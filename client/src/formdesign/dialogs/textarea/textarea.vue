/**
* Created with JetBrains WebStorm.
* @description:
* @params:
* @author: taowt
* @time: 2017/12/11 9:27
* @LastModifiedBy:
* @LastModifiedTime:
*/
<template>
  <div class="container">
    <el-form :model="formAttr" label-width="95px" :rules="formRules" ref="formAttr">
      <el-tabs v-model="activeName" class="tabs" type="border-card">
        <el-tab-pane label="基本" class="tab-pane">
          <el-row>
            <el-col :span="12">
              <el-form-item label="中文名 :" prop="fieldTitle">
                <el-col :span="22">
                  <el-input v-model="formAttr.fieldTitle" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段名 :" prop="fieldName">
                <el-col :span="22">
                  <el-input v-model="formAttr.fieldName" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="默认值 :" prop="defaultVal">
                <el-col :span="22">
                  <el-input v-model="formAttr.defaultVal" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提示语 :">
                <el-col :span="22">
                  <el-input v-model="formAttr.titleTip" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="字段类型 :" prop="fieldType">
                <el-col :span="22">
                  <el-select v-model="formAttr.fieldType" size="small" class="w100p">
                    <el-option label="字符型" value='char'></el-option>
                    <el-option label="文本大字段" value='clob'></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段长度 :" prop="fieldLength" v-if="needFieldLength">
                <el-col :span="22">
                  <el-input v-model="formAttr.fieldLength" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="高级" class="tab-pane">
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否必填 :" prop="isRequired">
                <el-switch v-model="formAttr.isRequired" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="只读 :">
                <el-switch v-model="formAttr.isReadonly" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="最多字符 :">
                <el-col :span="22">
                  <el-input v-model="formAttr.maxCharCount" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="样式" class="tab-pane">
          <el-row>
            <el-form-item label="宽度设置 :">
              <el-col :span="22">
                <el-slider v-model="formAttr.width"></el-slider>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="行数 :">
                <el-input-number v-model="formAttr.rows" :min="5" :max="80" size="small"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        oNode: '',
        pluginType: 'textarea',
        activeName: '',
        formAttr: {
          fieldTitle: '',
          fieldName: '',
          fieldLength: '',
          fieldType: '',
          defaultVal: '',
          titleTip: '',
          isRequired: '',
          isReadonly: '',
          maxCharCount: 500,
          width: 100,
          rows: 5
        },
        formRules: {
          fieldTitle: [{
            isRequired: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          fieldName: [{
            isRequired: true,
            message: '请输入字段名',
            trigger: 'blur'
          }],
          fieldLength: [{
            isRequired: true,
            message: '请输入字长度',
            trigger: 'blur'
          }],
          minVal: [{
            isRequired: true,
            message: '请输入最小值',
            trigger: 'blur'
          }],
          maxVal: [{
            isRequired: true,
            message: '请输入最大值',
            trigger: 'blur'
          }],
          defaultVal: [{
            isRequired: false,
            message: '请输入默认值',
            trigger: 'blur'
          }]
        }
      };
    },
    computed: {
      needFieldLength() {
        return this.formAttr.fieldType === 'char' || this.formAttr.fieldType === 'number';
      }
    },
    created() {
    },
    mounted() {
      const _this = this;
      const dialog = window.parent.$EDITORUI[window.frameElement.id.replace(/_iframe$/, '')];
      const editor = dialog.editor;
      const UE = window.parent.UE;
      const _form = _this.formAttr;
      let _node = _this.oNode;
      if (UE.plugins[_this.pluginType].editdom) {
        _node = UE.plugins[_this.pluginType].editdom;
        _form.fieldTitle = _node.getAttribute('fieldtitle');
        _form.fieldName = _node.getAttribute('fieldname');
        _form.fieldLength = _node.getAttribute('fieldlength');
        _form.fieldType = _node.getAttribute('fieldtype') || '';
        _form.defaultVal = _node.getAttribute('defaultval') || '';
        _form.titleTip = _node.getAttribute('placeholder') || '';

        _form.isReadonly = _node.getAttribute('isreadonly') === '1';
        _form.isRequired = _node.getAttribute('isrequired') === '1';
        _form.maxCharCount = _node.getAttribute('maxlength') || '';

        _form.width = _node.style.width ? +_node.style.width.replace(/\D/g, '') : 100;
        _form.rows = _node.getAttribute('rows') || 5;
      }
      dialog.oncancel = function () {
        if (UE.plugins[_this.pluginType].editdom) {
          delete UE.plugins[_this.pluginType].editdom;
        }
      };
      dialog.onok = function () {
        if (_form.fieldTitle === '') {
          _this.$message.error('中文名不能为空');
          return false;
        }
        if (_form.fieldName === '') {
          _this.$message.error('字段名不能为空');
          return false;
        }

        let fieldTitle = _form.fieldTitle;
        let fieldName = _form.fieldName;
        let fieldLength = _form.fieldLength;
        let fieldType = _form.fieldType;
        if (fieldType === 'char' && !fieldLength) {
          fieldLength = 500;
        }
        let defaultVal = _form.defaultVal;
        let titleTip = _form.titleTip;

        let isReadonly = _form.isReadonly ? 1 : 0;
        let isRequired = _form.isRequired ? 1 : 0;
        let maxCharCount = _form.maxCharCount;

        let width = _form.width;
        let rows = _form.rows;
        if (!_node) {
          try {
            _node = window.document.createElement(_this.pluginType);
            _node.setAttribute('plugintype', _this.pluginType);
            _node.classList.add('ele-' + _this.pluginType);

            _node.setAttribute('fieldtitle', fieldTitle);
            _node.setAttribute('fieldname', fieldName);
            _node.setAttribute('fieldlength', fieldLength);
            _node.setAttribute('fieldtype', fieldType);
            _node.setAttribute('defaultval', defaultVal);
            _node.setAttribute('placeholder', titleTip);

            _node.setAttribute('isreadonly', isReadonly);
            _node.setAttribute('isrequired', isRequired);
            _node.setAttribute('maxlength', maxCharCount);

            _node.style.width = width + '%';
            _node.setAttribute('rows', rows);
            editor.execCommand('insertHtml', _node.outerHTML);
          } catch (e) {
            try {
              editor.execCommand('error');
            } catch (e) {
              _this.$message.error('控件异常！');
            }
            return false;
          }
        } else {
          _node.setAttribute('fieldtitle', fieldTitle);
          _node.setAttribute('fieldname', fieldName);
          _node.setAttribute('fieldlength', fieldLength);
          _node.setAttribute('fieldtype', fieldType);
          _node.setAttribute('defaultval', defaultVal);
          _node.setAttribute('placeholder', titleTip);

          _node.setAttribute('isreadonly', isReadonly);
          _node.setAttribute('isrequired', isRequired);
          _node.setAttribute('maxlength', maxCharCount);

          _node.style.width = width + '%';
          _node.setAttribute('rows', rows);
          delete UE.plugins[_this.pluginType].editdom;
        }
      };
    }
  };
</script>
<style scoped>
  .container {
    width: 100%;
  }

  .tabs {
    margin: 2vw;
    min-height: 380px;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .w100p {
    width: 100%;
  }
</style>
