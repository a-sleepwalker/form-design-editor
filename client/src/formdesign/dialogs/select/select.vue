<template>
  <div class="container">
    <el-form :model="formAttr" labelWidth="95px" :rules="formRules" ref="formAttr">
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
              <el-form-item label="字段长度 :" prop="fieldLength">
                <el-col :span="22">
                  <el-input v-model="formAttr.fieldLength" size="small"></el-input>
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
              <el-form-item label="级联属性 :">
                <el-col :span="22">
                  <el-select v-model="formAttr.cascade" size="small" class="w100p">
                    <el-option label="1" value="1"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="填写方式 :">
                <el-radio-group v-model="formAttr.formFilledType" @change="getTableList">
                  <el-radio label="manual">手动填写</el-radio>
                  <el-radio label="auto">自动获取</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="formAttr.formFilledType==='auto'">
            <el-col :span="12">
              <el-form-item label="选数据表 :">
                <el-col :span="22">
                  <el-select class="w100p" v-model="formAttr.tableId" size="small" @change="getFieldList">
                    <el-option v-for="item in tableList" :key="item.id" label="" value=""></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选表字段 :">
                <el-col :span="22">
                  <el-select class="w100p" v-model="formAttr.fields" size="small">
                    <el-option v-for="item in fieldList" :key="item.id" label="" value=""></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-table :data="optionList" highlightCurrentRow border
                        ref="optionList" maxHeight="230"
                        @row-click="changeSelected">
                <el-table-column label="序号" header-align="center" align="center" width="70px"
                                 type="index"></el-table-column>
                <el-table-column label="选中" header-align="center" align="center" width="70px">
                  <template slot-scope="scope">
                    &nbsp;<el-radio v-model="formAttr.selected" :label="scope.row.saveVal">&nbsp;
                  </el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="显示值" header-align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.displayVal"
                              v-if="scope.row.webData.underModified"
                              size="small"></el-input>
                    <div v-else>{{scope.row.displayVal}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="选项值" header-align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.saveVal"
                              v-if="scope.row.webData.underModified" size="small"></el-input>
                    <div v-else>{{scope.row.saveVal}}</div>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="2">
              <div>
                <el-button class="btn" size="small" type="primary" @click="fnAdd"><i class="el-icon-plus"></i>
                </el-button>
              </div>
              <div>
                <el-button class="btn" size="small" :disabled="optionList.length===0" @click="fnMove(-1)"><i
                  class="el-icon-caret-top"></i></el-button>
              </div>
              <div>
                <el-button class="btn" size="small" :disabled="optionList.length===0" @click="fnMove(1)"><i
                  class="el-icon-caret-bottom"></i></el-button>
              </div>
              <div>
                <el-button class="btn" size="small" :disabled="optionList.length===0" @click="fnDelete"><i
                  class="el-icon-delete"></i></el-button>
              </div>
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
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="事件触发 :" prop="eventType">
              <el-col :span="11">
                <select multiple class="event-select">
                  <option value="onchange">onchange</option>
                  <option value="onblur">onblur</option>
                </select>
              </el-col>
              <el-col :span="11">
                <select multiple class="event-select">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </el-col>
            </el-form-item>
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
        pluginType: 'select',
        rowSelected: '',
        activeName: '',
        tableList: [],
        fieldList: [],
        optionList: [],
        formAttr: {
          fieldTitle: '',
          fieldName: '',
          fieldLength: '',
          titleTip: '',
          cascade: '',
          formFilledType: 'manual',
          tableId: '',
          tableField: '',
          isRequired: '',
          eventType: '',
          width: 100,
          selected: ''
        },
        formRules: {
          fieldTitle: [{
            required: true,
            message: '请输入中文名',
            trigger: 'blur'
          }],
          fieldName: [{
            required: true,
            message: '请输入字段名',
            trigger: 'blur'
          }],
          fieldLength: [{
            required: true,
            message: '请输入字段长度',
            trigger: 'blur'
          }, {
            type: 'number',
            message: '长度必须为数字',
            trigger: 'change'
          }],
          required: [{
            required: true,
            message: '请选择是否必填'
          }]
        }
      };
    },
    computed: {},
    methods: {
      fnAdd() {
        this.optionList.push({
          displayVal: '', saveVal: '', webData: {underModified: false}
        });
      },
      fnMove(steps) {
        let iActualIndex = this.optionList.indexOf(this.rowSelected);
        if (iActualIndex < 0) {
          return;
        }
        let iFinalIndex = iActualIndex + steps;
        if (iFinalIndex < 0) {
          iFinalIndex = 0;
        }
        if (iFinalIndex > (this.optionList.length - 1)) {
          iFinalIndex = this.optionList.length - 1;
        }
        if (iActualIndex === iFinalIndex) {
          return;
        }
        let temp = this.optionList[iFinalIndex];
//        let temp2 = this.optionList[iActualIndex];
        this.optionList.splice(iActualIndex, 1, temp);
        this.optionList.splice(iFinalIndex, 1, this.rowSelected);
//        this.rowSelected.webData.index = iFinalIndex;
        this.$refs.optionList.setCurrentRow(this.rowSelected);
      },
      fnDelete() {
        this.optionList.splice(this.optionList.indexOf(this.rowSelected), 1);
      },
      changeSelected(row) {
        this.rowSelected = row;
        this.optionList.forEach(v => {
          v === this.rowSelected ? v.webData.underModified = true : v.webData.underModified = false;
        });
      },
      getTableList() {
      },
      getFieldList() {
      }
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
        _form.fieldTitle = _node.getAttribute('fieldtitle').replace(/&quot;/g, '"');
        _form.fieldName = _node.getAttribute('fieldname');
        _form.fieldLength = _node.getAttribute('fieldlength');
        _form.titleTip = _node.getAttribute('placeholder') || '';
        _form.cascade = _node.getAttribute('cascade') || '';
        _form.formFilledType = _node.getAttribute('filled') || 'manual';
        _form.tableId = _node.getAttribute('tableid') || '';
        _form.tableField = _node.getAttribute('tablefield') || '';

        _form.isRequired = _node.getAttribute('isRequired') === '1';
        _form.eventType = _node.getAttribute('eventtype') || '';

        _form.width = _node.style.width ? +_node.style.width.replace(/\D/g, '') : 100;

        for (let i = 0; i < _node.options.length; i++) {
          _this.optionList.push({
            displayVal: _node.options[i].innerHTML,
            saveVal: _node.options[i].value,
            selected: _node.options[i].selected,
            webData: {
              underModified: false
            }
          });
        }
      }
      dialog.oncancel = function () {
        if (UE.plugins[_this.pluginType].editdom) {
          delete UE.plugins[_this.pluginType].editdom;
        }
      };
      dialog.onok = function () {
        if (_form.fieldTitle === '') {
          _this.$message.error('控件名称不能为空');
          return false;
        }
        if (_form.fieldName === '') {
          _this.$message.error('字段名不能为空');
          return false;
        }
        const fieldTitle = _form.fieldTitle.replace(/"/g, '&quot;');
        const fieldName = _form.fieldName;
        const fieldLength = _form.fieldLength;
        const titleTip = _form.titleTip;
        const cascade = _form.cascade;
        const filled = _form.formFilledType;
        const tableId = _form.tableId;
        const tableField = _form.tableField;

        const isRequired = _form.isRequired === true ? 1 : 0;
        const eventType = _form.eventType;

        // const width = _form.width;

        const selected = _form.selected;
        if (!_node) {
          try {
            _node = window.document.createElement(_this.pluginType);
            _node.setAttribute('plugintype', _this.pluginType);
            _node.setAttribute('fieldtype', 'char');
            _node.classList.add('ele-' + _this.pluginType);

            _node.setAttribute('fieldtitle', fieldTitle);
            _node.setAttribute('fieldname', fieldName);
            _node.setAttribute('fieldlength', fieldLength);
            _node.setAttribute('placeholder', titleTip);
            _node.setAttribute('cascade', cascade);
            _node.setAttribute('filled', filled);
            if (filled === 'auto') {
              _node.setAttribute('tableid', tableId);
              _node.setAttribute('tablefield', tableField);
            }

            _node.setAttribute('isrequired', isRequired);
            _node.setAttribute('eventtype', eventType);

            _this.optionList.forEach(v => {
              let option = window.document.createElement('option');
              option.value = v.saveVal;
              option.innerHTML = v.displayVal;
              option.selected = _form.selected === v.saveVal;
              _node.options.add(option);
            });
            editor.execCommand('insertHtml', _node.outerHTML);
            return true;
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
          _node.setAttribute('placeholder', titleTip);
          _node.setAttribute('cascade', cascade);
          _node.setAttribute('filled', filled);
          if (filled === 'auto') {
            _node.setAttribute('tableid', tableId);
            _node.setAttribute('tablefield', tableField);
          }

          _node.setAttribute('isrequired', isRequired);
          _node.setAttribute('eventtype', eventType);
          while (_node.options.length > 0) {
            _node.remove(0);
          }
          _this.optionList.forEach(v => {
            let option = window.document.createElement('option');
            option.value = v.saveVal;
            option.innerHTML = v.displayVal;
            option.selected = selected === v.saveVal;
            _node.options.add(option);
          });
          delete UE.plugins[_this.pluginType].editdom;
          return true;
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
    height: 480px;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .w100p {
    width: 100%;
  }

  .btn {
    margin-left: 1vw;
    margin-bottom: 1vw;
  }

  .event-select {
    width: 100%;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    text-indent: .5em;
  }

  .event-select option {
    height: 28px;
    line-height: 28px;
  }
</style>
<style>
  .el-table__body-wrapper {
    overflow-x: hidden !important;
  }
</style>
