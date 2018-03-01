<template>
  <div class="container">
    <el-tabs v-model="activeName" class="tabs" type="border-card">
      <el-tab-pane label="函数库" class="tab-pane">
        <el-row>
          <el-col :span="10">
            <el-input placeholder="输入关键字进行过滤" @blur="fnFilterTreeData" v-model="fnFilterText"></el-input>
            <idt-tree class="fnTree"
                      :data="filterTreeData" :setting="fnTreeSetting" :selectNode="selectNode" :skin="'metroStyle'"
                      @onClick="treeNodeClick" @afterTreeInit="afterTreeInit"></idt-tree>
          </el-col>
          <el-col :span="14">
            <el-row>
              <el-button-group class="tool-btns">
                <el-dropdown id="add-btn-group" trigger="click" @command="addFn">
                  <el-button :disabled="!activeNode"><i class="el-icon-plus mr-space"></i>添加</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="fl">添加分类</el-dropdown-item>
                    <el-dropdown-item command="fn">添加函数</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button :disabled="!activeNode" @click="updateFn"><i
                  class="el-icon-edit mr-space"></i>修改
                </el-button>
                <el-button :disabled="!activeNode" @click="delFn"><i class="el-icon-delete mr-space"></i>删除
                </el-button>
                <el-button :disabled="underModified===0" @click="saveFn"><i
                  class="el-icon-check mr-space"></i>保存
                </el-button>
              </el-button-group>
            </el-row>
            <el-form :model="formAttr" label-width="95px" :rules="formRules" ref="formAttr">
              <el-form-item :label="formAttr.fnTitleDesc+' :'" prop="fnTitle">
                <el-col :span="22">
                  <el-input v-model="formAttr.fnTitle" size="small" :disabled="underModified===0"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item v-if="formAttr.fnNameDesc==='函数名'" :label="formAttr.fnNameDesc+' :'" prop="fnName">
                <el-col :span="22">
                  <el-input v-model="formAttr.fnName" size="small" :disabled="underModified===0"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item :label="formAttr.fnTypeDesc+' :'">
                <el-col :span="22">
                  <el-select v-if="underModified===2" class="w100p" v-model="formAttr.fnPID" size="small">
                    <el-option v-for="typeItem in flNode" :key="typeItem.id" :label="typeItem.name"
                               :value="typeItem.id"></el-option>
                  </el-select>
                  <el-input v-else v-model="formAttr.fnPName" size="small" disabled></el-input>
                </el-col>
              </el-form-item>
            </el-form>
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
    height: 380px;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .w100p {
    width: 100%;
  }

  .fnTree {
    margin-top: 15px;
    height: 240px;
    overflow: auto;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
  }

  .tool-btns {
    margin: 0 0 15px 15px;
  }

  .tool-btns .el-button {
    padding: 10px 15px;
  }

  #add-btn-group, #del-btn-group {
    float: left;
    margin-right: -1px;
  }

  #add-btn-group > .el-button {
    border-radius: 4px 0 0 4px;
  }

  #del-btn-group > .el-button {
    border-radius: 0;
  }

  .mr-space {
    margin-right: .5em;
  }
</style>

<script>
  import idttree from '@/components/tree/tree.vue';
  import {
    getEformLibs,
    saveDesignformLib,
    saveDesignformLibsFL,
    deleteDesignformLibs,
    deleteDesignformFL
  } from '@/api/formdesign';

  export default {
    components: {
      'idt-tree': idttree
    },
    computed: {
      flNode() {
        return this.fnTreeData.filter(v => v.fnType === 'fl');
      }
    },
    data() {
      return {
        activeName: '',
        activeNode: '',
        selectNode: '',
        fnFilterText: '',
        underModified: 0, // 0:初始，1:添加，2:修改
        formAttr: {
          fnTitleDesc: '',
          fnTitle: '',
          fnNameDesc: '',
          fnName: '',
          fnTypeDesc: '',
          fnPID: '',
          fnPName: ''
        },
        formRules: {
          fnTitle: [{
            required: false,
            message: '请输入函数中文名',
            trigger: 'blur'
          }],
          fnName: [{
            required: false,
            message: '请输入函数名',
            trigger: 'blur'
          }]
        },
        fnTreeData: [],
        filterTreeData: [],
        command: '',
        fnTreeSetting: {
          data: {
            simpleData: {
              enable: true
            }
          }
        }
      };
    },
    created() {
      this.initTreeData();
      this.formAttr.fnTitleDesc = '函数标识';
      this.formAttr.fnNameDesc = '函数名';
      this.formAttr.fnTypeDesc = '函数类别';
    },
    mounted() {
    },
    methods: {
      addFn(command) {
        if (this.activeNode) {
          this.command = command;
          this.underModified = 1;
          this.formAttr.fnPName = this.activeNode.name;
          this.formAttr.fnName = this.formAttr.fnTitle = '';
          switch (command) {
            case 'fn':
              this.formAttr.fnTitleDesc = '函数标识';
              this.formAttr.fnNameDesc = '函数名';
              this.formAttr.fnTypeDesc = '函数类别';
              break;
            case 'fl':
              this.formAttr.fnTitleDesc = '分类名称';
              this.formAttr.fnNameDesc = '';
              this.formAttr.fnTypeDesc = '所属分类';
              break;
          }
        } else {
          this.$message.error('请选择添加位置');
        }
      },
      delFn() {
        if (this.activeNode && (this.activeNode.getParentNode() || this.activeNode.pId)) {
          let params = [this.activeNode.id];
          switch (this.activeNode.fnType) {
            case 'fn':
              deleteDesignformLibs(params).then(res => {
                if (res.status === 'success') {
                  this.$message.success('操作已成功');
                  this.initTreeData();
                } else {
                  this.$message.error(res.message);
                }
              }).catch(e => {
                this.$message.error(e.message);
              });
              break;
            case 'fl':
              deleteDesignformFL(params).then(res => {
                if (res.status === 'success') {
                  this.$message.success('操作已成功');
                  this.initTreeData();
                } else {
                  this.$message.error(res.message);
                }
              }).catch(e => {
                this.$message.error(e.message);
              });
              break;
          }
          this.activeNode = '';
        } else {
          this.$message.error('请选择删除项');
        }
      },
      updateFn() {
        if (this.activeNode) {
          this.underModified = 2;
          this.command = this.activeNode.fnType;
        } else {
          this.$message.error('请选择添加位置');
        }
      },
      saveFn() {
        let params = {};
        if (this.underModified === 1) {
          switch (this.command) {
            case 'fn':
              params.HSZWMC = this.formAttr.fnTitle;
              params.HSMC = this.formAttr.fnName;
              params.FL = this.activeNode.id;
              params.SSFJ = ' ';
              saveDesignformLib(params).then(res => {
                if (res.status === 'success') {
                  this.$message.success('操作已成功');
                  this.selectNode = res.data.UUID;
                  this.initTreeData();
                } else {
                  this.$message.error(res.message);
                }
              }).catch(e => {
                this.$message.error(e.message);
              });
              break;
            case 'fl':
              params.PUUID = this.activeNode.id;
              params.FLMC = this.formAttr.fnTitle;
              saveDesignformLibsFL(params).then(res => {
                if (res.status === 'success') {
                  this.$message.success('操作已成功');
                  this.selectNode = res.data.uuid;
                  this.initTreeData();
                } else {
                  this.$message.error(res.message);
                }
              }).catch(e => {
                this.$message.error(e.message);
              });
              break;
          }
        } else if (this.underModified === 2) {
          params.UUID = this.activeNode.id;
          switch (this.command) {
            case 'fn':
              params.HSZWMC = this.formAttr.fnTitle;
              params.HSMC = this.formAttr.fnName;
              params.FL = this.formAttr.fnPID;
              params.SSFJ = ' ';
              saveDesignformLib(params).then(res => {
                if (res.status === 'success') {
                  this.$message.success('操作已成功');
                  this.selectNode = res.data.UUID;
                  this.initTreeData();
                } else {
                  this.$message.error(res.message);
                }
              }).catch(e => {
                this.$message.error(e.message);
              });
              break;
            case 'fl':
              params.PUUID = this.formAttr.fnPID;
              params.FLMC = this.formAttr.fnTitle;
              saveDesignformLibsFL(params).then(res => {
                if (res.status === 'success') {
                  this.$message.success('操作已成功');
                  this.selectNode = res.data.uuid;
                  this.initTreeData();
                } else {
                  this.$message.error(res.message);
                }
              }).catch(e => {
                this.$message.error(e.message);
              });
              break;
          }
        }
        this.underModified = 0;
      },
      initTreeData() {
        getEformLibs().then(res => {
          if (res.status === 'success') {
            this.fnTreeData = res.data;
            this.filterTreeData = this.fnTreeData;
            for (let i = 0, l = this.filterTreeData.length; i < l; i++) {
              switch (this.filterTreeData[i].fnType) {
                case 'fn':
                  // this.filterTreeData[i].icon = '/static/formdesign/images/ks.png';
                  break;
                case 'fl':
                  // this.filterTreeData[i].icon = '/static/formdesign/images/fl.png';
                  break;
              }
            }
          } else {
            this.$message.error(res.message);
          }
        }).catch(e => {
          this.$message.error(e.message);
        });
      },
      fnFilterTreeData() {
        this.fnFilterText === '' ? this.filterTreeData = this.fnTreeData : this.filterTreeData = this.fnTreeData.filter(v => v.name.indexOf(this.fnFilterText) !== -1);
      },
      treeNodeClick(event, treeId, treeNode, clickFlag) {
//        console.log(treeNode);
        this.activeNode = treeNode;
        this.underModified = 0;
        this.formAttr.fnTitle = treeNode.name;
        this.formAttr.fnName = '';
        let parentNode = treeNode.getParentNode();
        this.formAttr.fnPName = parentNode ? parentNode.name : treeNode.name;
        switch (treeNode.fnType) {
          case 'fn':
            this.formAttr.fnTitleDesc = '函数标识';
            this.formAttr.fnNameDesc = '函数名';
            this.formAttr.fnTypeDesc = '函数类别';
//            getFnNameById({uuid: treeNode.id}).then(res => {
//              if (res.status === 'success') {
//                this.formAttr.fnName = res.data.fnName;
//              } else {
//                this.$message.error(res.message);
//              }
//            }).catch(e=>{
//              this.$message.error(e.message);
//            });
            break;
          case 'fl':
            this.formAttr.fnTitleDesc = '分类名称';
            this.formAttr.fnNameDesc = '';
            this.formAttr.fnTypeDesc = '所属分类';
            break;
        }
      },
      afterTreeInit(treeObject) {

      }
    }
  };
</script>
