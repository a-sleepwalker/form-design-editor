<template>
  <div class="container">
    <el-form :model="newForm" labelWidth="95px" :rules="formRules" ref="newForm">
      <el-tabs v-model="activeName" class="tabs" type="border-card">
        <el-tab-pane class="tab-pane" label="表单信息">
          <el-row>
            <el-col :span="24">
              <el-form-item label="表单类型 :">
                <el-radio-group v-model="formType">
                  <el-radio label="登记单"></el-radio>
                  <el-radio label="修改单"></el-radio>
                  <el-radio label="浏览单"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="数据模式 :">
                <el-radio-group v-model="newTable">
                  <el-radio :disabled="dataType" :label="false">已有数据表</el-radio>
                  <el-radio :disabled="dataType" :label="true">新建数据表</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="newTable">
            <el-row>
              <el-col :span="12">
                <el-form-item label="表单名称 :" prop="formName">
                  <el-col :span="22">
                    <el-input v-model="newForm.formName" size="small"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据表 :" prop="tableName">
                  <el-col :span="22">
                    <el-input v-model="newForm.tableName" size="small"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属模块 :" prop="tableModule">
                  <el-col :span="22">
                    <el-select @change="getAttachedTableListImpl" filterable v-model="newForm.tableModule" size="small"
                               class="w100p">
                      <el-option v-for="item in newForm.tableModuleList" :key="item.CATALOG_ID"
                                 :label="item.CATALOG_NAME"
                                 :value="item.CATALOG_ID"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="newTable && newForm.tableModule!==''" label="表类型 :" prop="tableType">
                  <el-col :span="22">
                    <el-select v-model="newForm.tableType" @change="hasPtable" size="small" class="w100p">
                      <el-option label="主表" value="主表"></el-option>
                      <el-option label="从表" value="从表"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item v-if="newForm.tableType==='从表'" label="所属主表 :" prop="attachedTable">
                  <el-col :span="22">
                    <el-select filterable v-model="newForm.attachedTable" size="small" class="w100p">
                      <el-option v-for="item in newForm.attachedTableList" :key="item.TABLE_ID"
                                 :label="item.TABLE_NAME" :value="item.TABLE_ID">
                        <span class="fll">{{item.TABLE_EXTERNAL_NAME}}</span>
                        <span class="flr">{{item.TABLE_NAME}}</span>
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row>
              <el-col :span="12">
                <el-form-item label="表单名称 :" prop="formName">
                  <el-col :span="22">
                    <el-input v-model="newForm.formName" size="small"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属模块 :" prop="tableModule">
                  <el-col :span="22">
                    <el-select @change="getAttachedTableListImpl" filterable v-model="newForm.tableModule" size="small"
                               class="w100p">
                      <el-option v-for="item in newForm.tableModuleList" :key="item.CATALOG_ID"
                                 :label="item.CATALOG_NAME"
                                 :value="item.CATALOG_ID"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="数据表 :" prop="tableName">
                  <el-col :span="22">
                    <el-select filterable v-model="newForm.tableName" size="small" class="w100p">
                      <el-option v-for="item in newForm.attachedTableList" :key="item.TABLE_ID"
                                 :label="item.TABLE_EXTERNAL_NAME"
                                 :value="item.TABLE_NAME"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
  import {saveFormdesignById, getCatalogList, getTablesByCataId} from '@/api/formdesign';

  let Base64 = require('js-base64');
  if (!Base64.decode) {
    Base64 = Base64.Base64;
  }
  export default {
    data() {
      return {
        dataType: false,
        newTable: false,
        formType: '登记单',
        activeName: '',
        newForm: {
          formName: '',
          tableName: '',
          tableModule: '',
          tableType: '',
          attachedTable: '',
          tableModuleList: [],
          attachedTableList: []
        },
        formRules: {
          formName: [
            {required: true, message: '请输入表单名称', trigger: 'blur'}
          ],
          tableName: [
            {required: true, message: '请输入表名', trigger: 'blur'}
          ],
          tableModule: [
            {required: true, message: '请选择所属模块', trigger: 'change'}
          ]

        }
      };
    },
    created() {
      this.getModuleListImpl();
    },
    watch: {
      newTable() {
        this.$refs['newForm'].resetFields();
      },
      formType() {
        if (this.formType === '登记单') {
          this.dataType = false;
        } else {
          this.newTable = false;
          this.dataType = true;
        }
      }
    },
    mounted() {
      const self = this;
      const dialog = window.parent.$EDITORUI[window.frameElement.id.replace(/_iframe$/, '')];
      const editor = dialog.editor;
      dialog.onok = function () {
        self.$refs['newForm'].validate((valid) => {
          if (valid) {
            let params = {
              name: self.newForm.formName,
              tablename: self.newForm.tableName,
              catalogid: self.newForm.tableModule,
              ps: ' ',
              bdlx: self.formType,
              content: Base64.encode(' '),
              ptablename: self.newTable ? (self.newForm.tableType === '主表' ? ' ' : self.newForm.attachedTable) : ' ',
              parseContent: Base64.encode(' ')
            };
            saveFormdesignById(params).then(res => {
              if (res.status === 'success') {
                editor.execCommand('cleardoc');
                sessionStorage.setItem('current-form', JSON.stringify({
                  UUID: res.data.UUID,
                  TABLENAME: res.data.TABLENAME,
                  NAME: res.data.NAME,
                  PTABLENAME: res.data.PTABLENAME,
                  MODULEID: res.data.MODULEID
                }));
              }
              dialog.close(false);
            });
            return false;
          } else {
            return false;
          }
        });
        return false;
      };
    },
    methods: {
      getModuleListImpl() {
        getCatalogList().then(res => {
          if (res.status === 'success') {
            this.newForm.tableModuleList = res.data;
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      getAttachedTableListImpl() {
        let params = {};
        params.catalogId = this.newForm.tableModule;
        getTablesByCataId(params).then(res => {
          if (res.status === 'success') {
            this.newForm.attachedTableList = res.data;
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      hasPtable(val) {
        if (val === '主表') {
          this.newForm.attachedTable = '';
        }
      }
    }
  };
</script>
<style scoped>
  .container {
    width: 100%;
  }

  .tabs {
    margin: 2vw;
    height: 380px;
    overflow: auto;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .w100p {
    width: 100%;
  }

  .fll {
    float: left;
  }

  .flr {
    float: right;
  }
</style>
