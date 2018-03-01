<template>
  <div class="container">
    <el-form :model="formAttr" label-width="95px" :rules="formRules" ref="formAttr">
      <el-tabs v-model="activeName" class="tabs" type="border-card">
        <el-tab-pane label="基本" class="tab-pane">
          <el-row>
            <el-col :span="12">
              <el-form-item label="页标题 :" prop="pageName">
                <el-col :span="22">
                  <el-input v-model="formAttr.pageName" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="当前页码 :" prop="pageNum">
                <el-col :span="22">
                  <el-input v-model="formAttr.pageNum" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
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

  export default {
    data: function () {
      return {
        oNode: '',
        pluginType: 'pagination',
        activeName: '',
        formAttr: {
          pageName: '',
          pageNum: ''
        },
        formRules: {
          pageName: [{}],
          pageNum: [{}]
        }
      };
    },
    created() {
    },
    mounted() {
      const self = this;
      const dialog = window.parent.$EDITORUI[window.frameElement.id.replace(/_iframe$/, '')];
      const editor = dialog.editor;
      const UE = window.parent.UE;
      const _form = self.formAttr;
      let _node = self.oNode;
      if (UE.plugins[self.pluginType].editdom) {
        _node = UE.plugins[self.pluginType].editdom;
        _form.pageName = _node.getAttribute('pagename');
        _form.pageNum = _node.getAttribute('pagenum');
      }
      dialog.oncancel = function () {
        if (UE.plugins[self.pluginType].editdom) {
          delete UE.plugins[self.pluginType].editdom;
        }
      };
      dialog.onok = function () {
        if (!Number.isInteger(+_form.pageNum)) {
          self.$message.error('页码必须为整数');
          return false;
        }
        if (!_node) {
          try {
            let html = '<p plugintype="' + self.pluginType + '" pagename="' + _form.pageName + '" pagenum="' + _form.pageNum + '" style="border-bottom: 5px solid rgb(128, 128, 128);height: 25px;">' + _form.pageName + '(页码：' + _form.pageNum + ')' + '</p>';
            // _node = window.document.createElement('hr');
            // _node.setAttribute('plugintype', self.pluginType);
            // _node.setAttribute('size', 5);
            // _node.style.backgroundColor = 'rgb(128,128,128)';
            // _node.setAttribute('pagename', _form.pageName);
            // _node.setAttribute('pagenum', _form.pageNum);
            editor.execCommand('insertHtml', html);
          } catch (e) {
            try {
              editor.execCommand('error');
            } catch (e) {
              self.$message.error('控件异常！');
            }
            return false;
          }
        } else {
          _node.setAttribute('pagename', _form.pageName);
          _node.setAttribute('pagenum', _form.pageNum);
          _node.innerHTML = _form.pageName + '(页码：' + _form.pageNum + ')';
          console.log(_node);
          delete UE.plugins[self.pluginType].editdom;
        }
      };
    }
  };
</script>
