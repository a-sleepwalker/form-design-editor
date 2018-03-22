<template>
  <div class="container">
    <el-form :model="formAttr" labelWidth="95px" ref="formAttr">
      <el-tabs v-model="activeName" class="tabs" type="border-card">
        <el-tab-pane label="基本" class="tab-pane">
          <el-row>
            <el-col :span="12">
              <el-form-item label="模块名称 :">
                <el-col :span="22">
                  <el-select v-model="formAttr.moduleId" @change="getTablesByCataIdImpl" filterable size="small">
                    <el-option v-for="item in moduleList" :key="item.CATALOG_ID" :label="item.CATALOG_NAME"
                               :value="item.CATALOG_ID"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属主表 :">
                <el-col :span="22">
                  <el-select v-model="formAttr.attachedTable" @change="getDesignformInfoListImpl()getFieldsImpl()"
                             filterable
                             size="small" :disabled="formAttr.moduleId===''">
                    <el-option v-for="item in attachedTableList" :key="item.TABLE_ID"
                               :label="item.TABLE_EXTERNAL_NAME" :value="item.TABLE_NAME">
                      <span class="fll">{{item.TABLE_EXTERNAL_NAME}}</span>
                      <span class="flr">{{item.TABLE_NAME}}</span>
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="表单选择 :">
                <el-col :span="22">
                  <el-select v-model="formAttr.formId" size="small" filterable :disabled="formAttr.attachedTable===''">
                    <el-option v-for="item in formList" :key="item.UUID" :label="item.NAME"
                               :value="item.UUID"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button-group class="ml25">
                <el-button :disabled="formAttr.formId===''" type="primary" size="small" @click="fnAdd"><i
                  class="el-icon-plus mr-space"></i>添加
                </el-button>
                <el-button :disabled="formAttr.gridList.length===0" size="small" @click="fnMove(-1)"><i
                  class="el-icon-caret-top mr-space"></i>上移
                </el-button>
                <el-button :disabled="formAttr.gridList.length===0" size="small" @click="fnMove(1)"><i
                  class="el-icon-caret-bottom mr-space"></i>下移
                </el-button>
                <el-button :disabled="formAttr.gridList.length===0" size="small" @click="fnDelete"><i
                  class="el-icon-delete mr-space"></i>删除
                </el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <el-table :data="formAttr.gridList" border ref="gridList" @row-click="changeSelected" maxHeight="240">
            <el-table-column label="序号" header-align="center" align="center" width="70px"
                             type="index"></el-table-column>
            <el-table-column label="显示名" header-align="center">
              <template slot-scope="scope">
                <el-select v-if="scope.row.webData.underModified"
                           v-model="scope.row.field"
                           valueKey="FIELD_NAME"
                           size="small">
                  <el-option v-for="item in fieldList"
                             :key="item.FIELD_NAME"
                             :label="item.FIELD_EXTERNAL_NAME"
                             :value="item"></el-option>
                </el-select>
                <div v-else>{{scope.row.field.FIELD_EXTERNAL_NAME}}</div>
              </template>
            </el-table-column>
            <el-table-column label="字段名" header-align="center">
              <template slot-scope="scope">
                <div>{{scope.row.field.FIELD_NAME}}</div>
              </template>
            </el-table-column>
            <el-table-column label="宽度" header-align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.webData.underModified" v-model="scope.row.width" size="small">
                  <el-button class="width-unit" slot="append"
                             @click="scope.row.widthUnit=scope.row.widthUnit==='px'?'%':'px'">
                    {{scope.row.widthUnit}}
                  </el-button>
                </el-input>
                <div v-else><span class="mr-space">{{scope.row.width}}</span>{{scope.row.widthUnit}}</div>
              </template>
            </el-table-column>
            <el-table-column label="函数" header-align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.webData.underModified" v-model="scope.row.fun" size="small"></el-input>
                <div v-else>{{scope.row.fun}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="权限">
          <el-row>
            <el-col :span="12">
              <el-form-item label="按钮 :">
                <el-checkbox-group v-model="formAttr.toolBtns">
                  <el-checkbox label="add">添加</el-checkbox>
                  <el-checkbox label="update">修改</el-checkbox>
                  <el-checkbox label="delete">删除</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="样式">
          <el-row>
            <el-col :span="12">
              <el-form-item label="控件宽度 :">
                <el-form-item>
                  <el-col :span="22">
                    <el-input v-model="formAttr.width" size="small">
                      <el-button class="width-unit" slot="append"
                                 @click="formAttr.widthUnit=formAttr.widthUnit==='px'?'%':'px'">
                        {{formAttr.widthUnit}}
                      </el-button>
                    </el-input>
                  </el-col>
                </el-form-item>
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
    height: 470px;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .ml25 {
    margin-left: 25px;
  }

  .mr-space {
    margin-right: .5em;
  }

  .width-unit {
    padding: 3px 0 0 0;
    width: 25px;
  }

  .fll {
    float: left;
  }

  .flr {
    float: right;
  }
</style>

<script>
  import {
    getCatalogList,
    getTablesByCataId,
    getDesignformInfoList,
    getFieldsInfoByFieldAttachTableList
  } from '@/api/formdesign';

  export default {
    data() {
      return {
        oNode: '',
        pluginType: 'inner_grid',
        activeName: '',
        rowSelected: '',
        fieldList: [],
        formList: [],
        attachedTableList: [
//          {
//            "TABLE_NAME": "web_scgl",
//            "TABLE_ID": "47c2c4885e5bb11c015eb7723e2905be",
//            "TABLE_EXTERNAL_NAME": "收藏管理"
//          }
        ],
        moduleList: [
//          {
//            "CATALOG_NAME": "专项资金",
//            "CATALOG_PROJECTID": "47c2c44d41aa68db0141b5028512001c",
//            "CATALOG_ID": "47c2c4885d778155015d81a5f8c60008"
//          },
//          {
//            "CATALOG_NAME": "负面清单",
//            "CATALOG_PROJECTID": "47c2c44d41aa68db0141b5028512001c",
//            "CATALOG_ID": "47c2c4885d778155015d81a45b060004"
//          },
//          {
//            "CATALOG_NAME": "事项管理",
//            "CATALOG_PROJECTID": "47c2c44d41aa68db0141b5028512001c",
//            "CATALOG_ID": "47c2c40b5ca48980015ca57339dc0108"
//          }
        ],
        formAttr: {
          moduleId: '',
          attachedTable: '',
          formId: '1c8efab6c37d11e7b7517b16d465tab4',
          toolBtns: [],
          width: '',
          widthUnit: 'px',
          gridList: []
        }
      };
    },
    created() {
      let currentForm = sessionStorage.getItem('current-form');
      if (currentForm) {
        currentForm = JSON.parse(currentForm);
        if (currentForm.MODULEID !== '') {
          this.getCatalogListImpl(currentForm.MODULEID);
        }
      }
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
        self.initGrid(_node.getAttribute('moduleid'), _node.getAttribute('tablename'), _node.getAttribute('formpage'));
        _form.toolBtns = _node.getAttribute('btns').replace(/^\[|]$/g, '').split(',').map(v => v.replace(/&quot;|\W/g, ''));
        let formWidth = _node.style.width;
        if (formWidth) {
          _form.width = formWidth.replace(/\D/g, '');
          _form.widthUnit = formWidth.replace(/\d/g, '');
        }
        let gridList = _node.getElementsByTagName('th');
        for (let i = 0; i < gridList.length; i++) {
          let row = {
            field: {
              FIELD_NAME: gridList[i].getAttribute('fieldname'),
              FIELD_EXTERNAL_NAME: gridList[i].innerHTML,
              FIELD_DATA_TYPE: '',
              FIELD_LENGTH: '',
              ODY: ''
            },
            fun: '',
            webData: {
              underModified: false
            }
          };
          let elWidth = gridList[i].style.width;
          if (elWidth) {
            row.width = elWidth.replace(/\D/g, '');
            row.widthUnit = elWidth.replace(/\d/g, '');
          }
          _form.gridList.push(row);
        }
      }
      dialog.oncancel = function () {
        if (UE.plugins[self.pluginType].editdom) {
          delete UE.plugins[self.pluginType].editdom;
        }
      };
      dialog.onok = function () {
        if (!_node) {
          try {
            if (_form.gridList.length === 0) {
              self.$message.error('字段不能为空');
              return false;
            }
            _node = window.document.createElement('table');
            _node.setAttribute('plugintype', self.pluginType);

            _node.setAttribute('moduleid', _form.moduleId);
            _node.setAttribute('tablename', _form.attachedTable);
            _node.setAttribute('formpage', _form.formId);
            _node.setAttribute('btns', JSON.stringify(_form.toolBtns));
            _node.style.width = _form.width + _form.widthUnit;
            let thead = '<th>序号</th>';
            let tbody = '<td>1</td>';
            _form.gridList.forEach(v => {
              thead += `<th fieldname="${v.field.FIELD_NAME}" style="width:${v.width}${v.widthUnit};">${v.field.FIELD_EXTERNAL_NAME}</th>`;
              tbody += '<td></td>';
            });
            _node.innerHTML = `<thead><tr>${thead}</tr></thead><tbody><tr>${tbody}</tr></tbody>`;
            editor.execCommand('insertHtml', _node.outerHTML);
          } catch (err) {
            try {
              editor.execCommand('error');
            } catch (e) {
              self.$message.error(e.message);
            }
          }
        } else {
          _node.setAttribute('moduleid', _form.moduleId);
          _node.setAttribute('tablename', _form.attachedTable);
          _node.setAttribute('formpage', _form.formId);
          _node.setAttribute('btns', JSON.stringify(_form.toolBtns).replace(/"/g, "'"));
          _node.style.width = _form.width + _form.widthUnit;
          let thead = '<th>序号</th>';
          let tbody = '<td>1</td>';
          _form.gridList.forEach(v => {
            thead += `<th fieldname="${v.field.FIELD_NAME}" style="width:${v.width}${v.widthUnit};">${v.field.FIELD_EXTERNAL_NAME}</th>`;
            tbody += '<td></td>';
          });
          _node.innerHTML = `<thead><tr>${thead}</tr></thead><tbody><tr>${tbody}</tr></tbody>`;

          delete UE.plugins[self.pluginType].editdom;
        }
      };
    },
    methods: {
      getCatalogListImpl(moduleId) {
        getCatalogList().then(res => {
          if (res.status === 'success') {
            this.moduleList = res.data;
            if (moduleId) {
              this.formAttr.moduleId = moduleId;
            }
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      getTablesByCataIdImpl() {
        this.formAttr.attachedTable = '';
        let params = {};
        params.catalogId = this.formAttr.moduleId;
        getTablesByCataId(params).then(res => {
          if (res.status === 'success') {
            this.attachedTableList = res.data;
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      getDesignformInfoListImpl() {
        this.formAttr.formId = '';
        getDesignformInfoList().then(res => {
          if (res.status === 'success') {
            this.formList = res.data;
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      getFieldsImpl() {
        getFieldsInfoByFieldAttachTableList('47c2c4885e5bb11c015eb7723e2905be').then(res => {
          if (res.status === 'success') {
            this.fieldList = res.data.DataList;
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      fnAdd() {
        let newRow = {
          field: {},
          width: '',
          widthUnit: 'px',
          fun: '',
          webData: {
            underModified: true
          }
        };
        this.formAttr.gridList.push(newRow);
        this.changeSelected(newRow);
      },
      fnModify() {
      },
      fnMove(steps) {
        let iActualIndex = this.formAttr.gridList.indexOf(this.rowSelected);
        if (iActualIndex < 0) {
          return;
        }
        let iFinalIndex = iActualIndex + steps;
        if (iFinalIndex < 0) {
          iFinalIndex = 0;
        }
        if (iFinalIndex > (this.formAttr.gridList.length - 1)) {
          iFinalIndex = this.formAttr.gridList.length - 1;
        }
        if (iActualIndex === iFinalIndex) {
          return;
        }
        this.formAttr.gridList.splice(iActualIndex, 1, this.formAttr.gridList[iFinalIndex]);
        this.formAttr.gridList.splice(iFinalIndex, 1, this.rowSelected);
        this.$refs.gridList.setCurrentRow();
        this.$refs.gridList.setCurrentRow(this.rowSelected);
      },
      fnDelete() {
        this.formAttr.gridList.splice(this.formAttr.gridList.indexOf(this.rowSelected), 1);
      },
      changeSelected(row) {
        this.rowSelected = row;
        this.formAttr.gridList.forEach(v => {
          v.webData.underModified = v === row;
        });
      },
      initGrid(moduleId, tableName, formId) {
        getCatalogList().then(res => {
          if (res.status === 'success') {
            this.moduleList = res.data;
            this.formAttr.moduleId = moduleId;
            let params = {};
            params.catalogId = this.formAttr.moduleId;
            return getTablesByCataId(params);
          } else {
            this.$message.error(res.message);
          }
        }).then(res => {
          if (res.status === 'success') {
            this.attachedTableList = res.data;
            this.formAttr.attachedTable = tableName;
            return getDesignformInfoList();
          } else {
            this.$message.error(res.message);
          }
        }).then(res => {
          if (res.status === 'success') {
            this.formList = res.data;
            this.formAttr.formId = formId;
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      }
    }
  };
</script>
