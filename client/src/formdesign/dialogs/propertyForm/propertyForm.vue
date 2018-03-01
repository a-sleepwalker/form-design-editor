<template>
  <div class="container">
    <el-form :model="propertyForm" labelWidth="95px" ref="propertyForm">
      <el-tabs v-model="activeName" class="tabs" type="border-card">
        <el-tab-pane class="tab-pane" label="表单信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="表单名称 :">
                <el-col :span="22">
                  <el-input disabled v-model="propertyForm.formName" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表名 :">
                <el-col :span="22">
                  <el-input disabled v-model="propertyForm.tableName" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="所属模块 :">
                <el-col :span="22">
                  <el-input disabled v-model="propertyForm.tableModule" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表类型 :">
                <el-col :span="22">
                  <el-input disabled v-model="propertyForm.tableType" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="propertyForm.tableType==='从表'" label="所属主表 :">
                <el-col :span="22">
                  <el-input disabled v-model="propertyForm.attachedTable" size="small"></el-input>
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
    overflow: auto;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .w100p {
    width: 100%;
  }
</style>

<script>

  export default {
    data() {
      return {
        activeName: '',
        propertyForm: {
          formName: '',
          tableName: '',
          tableModule: '',
          tableType: '',
          attachedTable: ''
        }
      };
    },
    created() {
      this.getFormProperty();
    },
    mounted() {
    },
    methods: {
      getFormProperty() {
        let propStr = sessionStorage.getItem('current-form');
        if (propStr !== '') {
          let propJson = JSON.parse(propStr);
          this.propertyForm.tableName = propJson.TABLENAME;
          this.propertyForm.formName = propJson.NAME;
          this.propertyForm.tableModule = propJson.MODULEID;
          this.propertyForm.attachedTable = propJson.PTABLENAME;
          this.propertyForm.tableType = propJson.PTABLENAME === ' ' ? '主表' : '从表';
        }
      }
    }
  };
</script>
