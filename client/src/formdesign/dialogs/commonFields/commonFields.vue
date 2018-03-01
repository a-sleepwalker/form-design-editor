<template>
  <div class="container">
    <el-tabs v-model="activeName" class="tabs" type="border-card">
      <el-tab-pane label="常用字段" class="tab-pane">
        <el-button :type="item.webData.selected?'primary':''" @click="insertCommonField(item)"
                   v-for="item in commonFields" :key="item.fieldname">{{item.fieldtitle}}
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
  }

  .tabs {
    margin: 2vw;
    height: 380px;
  }

  .tab-pane {
    margin-top: 2vw;
  }
</style>

<script>
  import {commonFields} from '../../commonFields';

  export default {
    data() {
      return {
        activeName: '',
        commonFields: '',
        editor: '',
        DOMElement: ''
      };
    },
    created() {
      commonFields.forEach(v => {
        v.webData = {};
        v.webData.selected = false;
      });
      this.commonFields = commonFields;
    },
    mounted() {
      const self = this;
      const dialog = window.parent.$EDITORUI[window.frameElement.id.replace(/_iframe$/, '')];
      self.editor = dialog.editor;
      // const UE = window.parent.UE;
      dialog.onok = function () {
        try {
          self.editor.execCommand('insertHtml', self.DOMElement.outerHTML);
        } catch (e) {
          self.$message.error(e.message);
        }
      };
    },
    methods: {
      insertCommonField(fieldItem) {
        this.commonFields.forEach(v => {
          v === fieldItem ? fieldItem.webData.selected = true : v.webData.selected = false;
        });
        let _DOMElement;
        if (fieldItem.type === 'input' || fieldItem.type === 'textarea' || fieldItem.type === 'select') {
          _DOMElement = window.document.createElement(fieldItem.type);
          _DOMElement.setAttribute('plugintype', fieldItem.type);
          _DOMElement.setAttribute('fieldname', fieldItem.fieldname);
          _DOMElement.setAttribute('fieldtitle', fieldItem.fieldtitle);
          _DOMElement.setAttribute('fieldlength', fieldItem.fieldlength);
          _DOMElement.setAttribute('required', fieldItem.required);
          _DOMElement.setAttribute('style-size', 'middle');
          _DOMElement.classList.add('ele-middle', 'ele-' + fieldItem.type);
          switch (fieldItem.type) {
            case 'input':
              _DOMElement.type = 'text';
              _DOMElement.setAttribute('placeholder', fieldItem.fieldtitle);
//              _DOMElement.value=fieldItem.fieldtitle;
              break;
            case 'textarea':
              _DOMElement.innerHTML = fieldItem.fieldtitle;
              break;
            case 'select':
              for (let i = 0; i < fieldItem.options.length; i++) {
                let option = window.document.createElement('option');
                option.value = option.innerHTML = fieldItem.options[i];
                _DOMElement.options.add(option);
              }
              break;
          }
        } else if (fieldItem.type === 'radio' || fieldItem.type === 'checkbox') {
          _DOMElement = window.document.createElement('span');
          _DOMElement.setAttribute('plugintype', fieldItem.type);
          _DOMElement.setAttribute('fieldname', fieldItem.fieldname);
          _DOMElement.setAttribute('fieldtitle', fieldItem.fieldtitle);
          _DOMElement.setAttribute('fieldlength', fieldItem.fieldlength);
          _DOMElement.setAttribute('required', fieldItem.required);
          let _html = [];
          fieldItem.options.forEach((v, i) => {
            _html.push(`<input type="${fieldItem.type}" value="${v}" name="${fieldItem.fieldname}" timestamp="${i}"/><label>${v}</label>`);
          });
          _DOMElement.innerHTML = _html.join('');
        }
        this.DOMElement = _DOMElement;
      }
    }
  };
</script>
