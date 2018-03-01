<template>
  <div class="container">
    <el-tabs class="tabs" v-model="activeName" type="border-card">
      <el-tab-pane class="tab-pane" label="打开表单">
        <el-row>
          <el-col :span="18">
            <el-input @change="listFilter" placeholder="请输入表单名称" icon="search" class="search-text"></el-input>
            <el-table :data="filterList" maxHeight="240" ref="formTable" highlightCurrentRow border
                      @row-click="formSelectHandler">
              <el-table-column type="index" label="序号" header-align="center" align="center"
                               width="90px"></el-table-column>
              <el-table-column label="表单名称" header-align="center" prop="NAME" width="">
                <template slot-scope="scope">
                  <el-input v-if="scope.row.webData.underModified" v-model="scope.row.NAME"
                            :disabled="!scope.row.webData.underModified"></el-input>
                  <div v-else>{{scope.row.NAME}}</div>
                </template>
              </el-table-column>
              <el-table-column label="表名" header-align="center" prop="TABLENAME" width=""></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6">
            <div>
              <el-button class="btn" @click="openSelectedForm"><i class="el-icon-document"></i>打开</el-button>
            </div>
            <div>
              <el-button class="btn" @click="renameSelectedForm"
                         v-if="formSelected.webData&&formSelected.webData.underModified" type="success"><i
                class="el-icon-upload2"></i>保存
              </el-button>
              <el-button class="btn" @click="renameSelectedForm" v-else><i class="el-icon-edit"></i>重命名</el-button>
            </div>
            <div>
              <el-button class="btn" @click="deleteSelectedForm"><i class="el-icon-delete"></i>删除</el-button>
            </div>
          </el-col>
        </el-row>
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
    min-height: 380px;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .search-text {
    margin-bottom: 15px;
  }

  .btn {
    margin: 2vw 0 0 3vw;
    width: 95px;
  }

  .btn i {
    margin-right: 5px;
  }
</style>
<style>
  .el-table__body-wrapper {
    overflow-x: hidden !important;
  }
</style>
<script>
  import {getDesignformInfoList, deleteDesignformInfo, getFormdesignById, updateDesignformName} from '@/api/formdesign';

  let Base64 = require('js-base64');
  if (!Base64.decode) {
    Base64 = Base64.Base64;
  }
  export default {
    data() {
      return {
        activeName: '',
        formSelected: {},
        formList: [],
        filterList: []
      };
    },
    computed: {},
    created() {
      this.getFormList();
    },
    methods: {
      getFormList() {
        getDesignformInfoList().then(res => {
          if (res.status === 'success') {
            res.data.forEach((v, i) => {
              v.webData = {};
              v.webData.underModified = false;
              v.webData.index = i;
            });
            this.formList = res.data;
            this.filterList = this.formList;
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      formSelectHandler(row) {
        this.formSelected = row;
      },
      openSelectedForm() {
        const dialog = window.parent.$EDITORUI[window.frameElement.id.replace(/_iframe$/, '')];
        const editor = dialog.editor;
        if (this.formSelected.hasOwnProperty('UUID')) {
          let params = {uuid: this.formSelected.UUID};
          getFormdesignById(params).then(res => {
            if (res.status === 'success') {
              sessionStorage.setItem('current-form', JSON.stringify({
                UUID: res.data.UUID,
                TABLENAME: res.data.TABLENAME,
                NAME: res.data.NAME,
                PTABLENAME: res.data.PTABLENAME,
                MODULEID: res.data.MODULEID
              }));
              editor.execCommand('cleardoc');
              editor.execCommand('insertHtml', res.data.CONTENT);
              dialog.close(false);
            } else {
              this.$message.error(res.message);
            }
          }).catch(err => {
            this.$message.error(err.message);
          });
        } else {
          this.$message.warning('请选择一个表单!');
        }
      },
      renameSelectedForm() {
        if (this.formSelected.hasOwnProperty('UUID')) {
          if (!this.formSelected.webData.underModified) {
            this.formSelected.webData.underModified = !this.formSelected.webData.underModified;
          } else {
            this.formSelected.webData.underModified = !this.formSelected.webData.underModified;
            let params = {
              name: this.formSelected.NAME,
              uuid: this.formSelected.UUID
            };
            updateDesignformName(params).then(res => {
              if (res.status === 'success') {
                this.$message.success('更改成功！');
              } else {
                this.$message.error(res.message);
              }
            }).catch(err => {
              this.$message.error(err.message);
            });
          }
        } else {
          this.$message.warning('请选择一个表单!');
        }
      },
      deleteSelectedForm() {
        if (this.formSelected.hasOwnProperty('UUID')) {
          let params = [this.formSelected.UUID];
          deleteDesignformInfo(params).then(res => {
            if (res.status === 'success') {
              this.$message.success('删除成功！');
              this.formSelected = {};
//              this.formList.splice(this.formSelected.webData.index, 1);
//              this.filterList.splice(this.filterList.indexOf(this.formSelected),1);
              this.getFormList();
            } else {
              this.$message.error(res.message);
            }
          }).catch(err => {
            this.$message.error(err.message);
          });
        } else {
          this.$message.warning('请选择一个表单!');
        }
      },
      listFilter(queryStr) {
        this.filterList = queryStr ? this.formList.filter(v => v.NAME.indexOf(queryStr) !== -1) : this.formList;
      },
      formAutoComplete() {

      }
    }
  };
</script>
