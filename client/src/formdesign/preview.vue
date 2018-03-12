<template>
  <div class="container">
    <form action="" name="form" id="form">
      <div id="form-intro" v-html="intro"></div>
      <el-tabs v-if="formPages.length>0" v-model="activeName" class="form-content" type="border-card">
        <el-tab-pane v-for="item in formPages"
                     :label="item.pageName" :key="item.pageNum"
                     class="form-content-page">
          <div v-html="item.content"></div>
        </el-tab-pane>
      </el-tabs>
    </form>
    <el-dialog :title="gridTitle" :visible.sync="dialogFormVisible" ref="dialog">
      <div id="grid-content" v-html="gridContent"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = falsesaveGrid()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getFormdesignById} from '@/api/formdesign';

  let Base64 = require('js-base64');
  if (!Base64.decode) {
    Base64 = Base64.Base64;
  }
  export default {
    data() {
      return {
        activeName: '',
        dialogFormVisible: false,
        uuid: '',
        content: '',
        gridList: '',
        intro: '',
        gridTitle: '',
        gridContent: '',
        formPages: []
      };
    },
    created() {
      this.uuid = window.location.search.substr(1).split('&')[0].split('=')[1];
    },
    mounted() {
      const _this = this;
      let params = {uuid: _this.uuid};
      getFormdesignById(params).then(res => {
        if (res.status === 'success') {
          _this.content = Base64.decode(res.data.CONTENT).replace(/<body>|<\/body>/g, '');
          let _DOM = window.document.createElement('div');
          _DOM.innerHTML = _this.content;
          let innerGrid = _DOM.querySelectorAll('[plugintype=inner_grid]');
          if (innerGrid.length > 0) {
            _this.parseGrid(innerGrid);
          }
          let pages = _DOM.querySelectorAll('[plugintype=pagination]');
          if (pages.length > 0) {
            _this.parsePage(pages);
          } else {
            _this.intro = _this.content;
          }
          $(_DOM).remove();
        } else {
          _this.$message.error(res.message);
        }
      }).catch(err => {
        _this.$message.error(err.message);
      });
      window.parent.fnTempSave = _this.submit;
      window.parent.fnTempSaveGrid = _this.saveGrid;
    },
    methods: {
      submit() {
        let formData = {};
        $('[fieldname]').each(function () {
          let formVal = '';
          let pt = $(this).attr('plugintype');
          if (pt === 'input' || pt === 'select') {
            formVal = $(this).val();
          } else if (pt === 'textarea') {
            formVal = $(this).html();
          } else if (pt === 'radio') {
            formVal = $(this).find('input:checked').length > 0 ? $(this).find('input:checked').val() : '';
          } else if (pt === 'checkbox') {
            formVal = [];
            if ($(this).find('input:checked').length > 0) {
              $(this).find('input:checked').each(function () {
                formVal.push($(this).val());
              });
            }
          }
          formData[$(this).attr('fieldname')] = formVal;
        });
        let formId = '1234';
        let gridId = 'grid-1234';
        formData['uuid'] = formId;
        formData['attach_id'] = gridId;
        console.log(formData);
      },
      saveGrid() {
        let formData = {};
        $('[fieldname]', $('#grid-content')).each(function () {
          let formVal = '';
          let pt = $(this).attr('plugintype');
          if (pt === 'input' || pt === 'select') {
            formVal = $(this).val();
          } else if (pt === 'textarea') {
            formVal = $(this).html();
          } else if (pt === 'radio') {
            formVal = $(this).find('input:checked').length > 0 ? $(this).find('input:checked').val() : '';
          } else if (pt === 'checkbox') {
            formVal = [];
            if ($(this).find('input:checked').length > 0) {
              $(this).find('input:checked').each(function () {
                formVal.push($(this).val());
              });
            }
          }
          formData[$(this).attr('fieldname')] = formVal;
        });
        let formId = 'grid-1234';
        formData['uuid'] = formId;
        console.log(formData);
      },
      getGridList() {
        let tbodyList = [
          {scr: 'ddd', bm: 'ccc', zj: 'bbb', abn: 'www'}
        ];
        return tbodyList;
      },
      parseGrid(innerGrid) {
        const _this = this;
        $(innerGrid).each(function () {
          const $grid = $(this);
          let tableName = $grid.attr('tablename');
          let gridForm = $grid.attr('formpage');
          let fields = [];
          // 获取显示字段
          $grid.find('th').each(function () {
            let displayField = $(this).attr('fieldname');
            if (displayField) {
              fields.push(displayField);
            }
          });
          // 获取列表
          let tbodyList = _this.getGridList();
          let _tbody = '';
          tbodyList.forEach((v, i) => {
            let _tr = `<tr><td>${i + 1}</td>`;
            fields.forEach(f => {
              _tr += `<td fieldname="${f}">${v[f]}</td>`;
            });
            _tr += '</tr>';
            _tbody += _tr;
          });
          $grid.find('tbody').html(_tbody);
          // 获取权限按钮
          let btns = $grid.attr('btns');
          let $btnDOM = $('<span></span>');
          if (btns.indexOf('add') > -1) {
            $btnDOM.append(`<a href="javascript:" class="grid-btn-add-${tableName}">新增</a>`);
          }
          if (btns.indexOf('delete') > -1) {
            $btnDOM.append(`<a href="javascript:" class="grid-btn-delete-${tableName}">删除</a>`);
          }
          if (btns.indexOf('update') > -1) {
            $btnDOM.append(`<a href="javascript:" class="grid-btn-update-${tableName}">修改</a>`);
          }
          $grid.after($btnDOM);

          setTimeout(function () {
            $('.grid-btn-add-' + tableName).click(function () {
              _this.dialogFormVisible = true;
              getFormdesignById({uuid: gridForm}).then(res => {
                if (res.status === 'success') {
                  _this.gridContent = res.data.CONTENT.replace(/<body>|<\/body>/g, '');
                } else {
                  _this.$message.error(res.message);
                }
              }).catch(err => {
                _this.$message.error(err.message);
              });
            });
          });
        });
      },
      parsePage(pages) {
        const _this = this;
        $(pages).eq(0).prevAll().each(function () {
          _this.intro += this.outerHTML || '';
        });
        for (let i = 0, l = pages.length; i < l; i++) {
          let formPage = {
            pageName: pages[i].getAttribute('pagename'),
            pageNum: pages[i].getAttribute('pagenum')
          };
          formPage.content = '';
          $(pages[i]).nextUntil('[plugintype="pagination"]').each(function () {
            formPage.content += this.outerHTML || '';
          });
          _this.formPages.push(formPage);
        }
      }
    }
  };
</script>

<style>
  .container {
    padding: 2vw;
  }

  [class^="grid-btn"] {
    margin: 5px;
    padding: 6px 12px;
    display: inline-block;
    text-decoration: none;
    color: #FFFFFF;
    background: #20a0ff;
    border-radius: 4px;
  }

  [class^="grid-btn"]:hover {
    opacity: .7;
  }
</style>
