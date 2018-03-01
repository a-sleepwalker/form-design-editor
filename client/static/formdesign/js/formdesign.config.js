/*
* 设计器私有的配置说明
* 一
* UE.leipiFormDesignUrl  插件路径
*
* 二
*UE.getEditor('myFormDesign',{
*          toolleipi:true,//是否显示，设计器的清单 tool
*/
UE.leipiFormDesignUrl = '/formdesign/dialogs/';
var width = '700';
var height = '410';
/**
 * 文本框
 * @command textfield
 * @method execCommand
 * @param { String } cmd 命令字符串
 */

UE.plugins['input'] = function () {
  var me = this, pluginType = 'input';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'text/index.html',
        name: pluginType,
        editor: this,
        title: '文本框',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    // console.log(el.getAttribute("plugintype") === me.pluginType);
    if (/input/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>文本框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 数字框
 * @command macros
 * @method execCommand
 * @param { String } cmd 命令字符串
 */
UE.plugins['number'] = function () {
  var me = this, pluginType = 'number';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'number/index.html',
        name: pluginType,
        editor: this,
        title: '数字输入框',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/input/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>数字输入框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 单选框组
 * @command radio
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'radio');
 * ```
 */
UE.plugins['radio'] = function () {
  var me = this, pluginType = 'radio';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'radio/index.html',
        name: pluginType,
        editor: this,
        title: '单选框组',
        cssRules: 'width:' + width + 'px;height:510px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/span/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>单选框组: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        var elInput = el.getElementsByTagName('input');
        var rEl = elInput.length > 0 ? elInput[0] : el;
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(rEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 复选框组
 * @command checkbox
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'checkbox');
 * ```
 */
UE.plugins['checkbox'] = function () {
  var me = this, pluginType = 'checkbox';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'checkbox/index.html',
        name: pluginType,
        editor: this,
        title: '复选框组',
        cssRules: 'width:' + width + 'px;height:510px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/span/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>复选框组: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        var elInput = el.getElementsByTagName('input');
        var rEl = elInput.length > 0 ? elInput[0] : el;
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(rEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 多行文本框
 * @command textarea
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'textarea');
 * ```
 */
UE.plugins['textarea'] = function () {
  var me = this, pluginType = 'textarea';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'textarea/index.html',
        name: pluginType,
        editor: this,
        title: '多行文本框',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/textarea/ig.test(el.tagName)) {
      var html = popup.formatHtml(
        '<nobr>多行文本框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 下拉菜单
 * @command select
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'select');
 * ```
 */
UE.plugins['select'] = function () {
  var me = this, pluginType = 'select';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        // iframeUrl:this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl+'/select.html',
        iframeUrl: UE.leipiFormDesignUrl + 'select/index.html',
        name: pluginType,
        editor: this,
        title: '下拉菜单',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/select|span/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>下拉菜单: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        if (el.tagName == 'SPAN') {
          var elInput = el.getElementsByTagName('select');
          el = elInput.length > 0 ? elInput[0] : el;
        }
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 进度条
 * @command progressbar
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'progressbar');
 * ```
 */
UE.plugins['progressbar'] = function () {
  var me = this, pluginType = 'progressbar';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl + '/progressbar.html',
        name: pluginType,
        editor: this,
        title: '进度条',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/img/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>进度条: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 二维码
 * @command qrcode
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'qrcode');
 * ```
 */
UE.plugins['qrcode'] = function () {
  var me = this, pluginType = 'qrcode';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl + '/qrcode.html',
        name: pluginType,
        editor: this,
        title: '二维码',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/img/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>二维码: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 二维表
 * @command inner_grid
 * @method execCommand
 * @param { String } cmd 命令字符串
 */
UE.plugins['inner_grid'] = function () {
  var me = this, pluginType = 'inner_grid';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'innerGrid/index.html',
        name: pluginType,
        editor: this,
        title: '二维表',
        cssRules: 'width:850px;height:510px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/table/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>二维表: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};
/**
 * 函数库
 */
UE.plugins['fn_lib'] = function () {
  var me = this, pluginType = 'fn_lib';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'lib/index.html',
        name: pluginType,
        editor: this,
        title: '函数库',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
};
/**
 * 常用字段
 */
UE.plugins['common_fields'] = function () {
  var me = this, pluginType = 'common_fields';
  me.commands[pluginType] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'commonFields/index.html',
        name: pluginType,
        editor: this,
        title: '常用字段',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }
        ]
      });
      dialog.render();
      dialog.open();
    }
  };
  // var popup = new baidu.editor.ui.Popup({
  //   editor: this,
  //   content: '',
  //   className: 'edui-bubble',
  //   _edittext: function (thePlugin) {
  //     baidu.editor.plugins[thePlugin].editdom = popup.anchorEl;
  //     me.execCommand(thePlugin);
  //     this.hide();
  //   },
  //   _delete: function () {
  //     if (window.confirm('确认删除该控件吗？')) {
  //       baidu.editor.dom.domUtils.remove(this.anchorEl, false);
  //     }
  //     this.hide();
  //   }
  // });
  // popup.render();
  // me.addListener('mouseover', function (t, evt) {
  //   evt = evt || window.event;
  //   let el = evt.target || evt.srcElement;
  //   if (/input/ig.test(el.tagName) && el.getAttribute("plugintype") === 'input') {
  //     let html = popup.formatHtml(
  //       '<nobr>文本框: <span onclick=$$._edittext("input") class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
  //     if (html) {
  //       popup.getDom('content').innerHTML = html;
  //       popup.anchorEl = el;
  //       popup.showAnchor(popup.anchorEl);
  //     } else {
  //       popup.hide();
  //     }
  //   } else if (/span/ig.test(el.tagName) && el.getAttribute('plugintype') === 'radio') {
  //     let html = popup.formatHtml(
  //       '<nobr>单选框组: <span onclick=$$._edittext("radio") class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
  //     if (html) {
  //       let elInput = el.getElementsByTagName("input");
  //       let rEl = elInput.length > 0 ? elInput[0] : el;
  //       popup.getDom('content').innerHTML = html;
  //       popup.anchorEl = el;
  //       popup.showAnchor(rEl);
  //     } else {
  //       popup.hide();
  //     }
  //   } else if (/span/ig.test(el.tagName) && el.getAttribute('plugintype') === 'checkbox') {
  //     let html = popup.formatHtml(
  //       '<nobr>复选框组: <span onclick=$$._edittext("checkbox") class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
  //     if (html) {
  //       let elInput = el.getElementsByTagName("input");
  //       let rEl = elInput.length > 0 ? elInput[0] : el;
  //       popup.getDom('content').innerHTML = html;
  //       popup.anchorEl = el;
  //       popup.showAnchor(rEl);
  //     } else {
  //       popup.hide();
  //     }
  //   } else if (/textarea/ig.test(el.tagName) && el.getAttribute('plugintype') === 'textarea') {
  //     let html = popup.formatHtml(
  //       '<nobr>多行文本框: <span onclick=$$._edittext("textarea") class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
  //     if (html) {
  //       popup.getDom('content').innerHTML = html;
  //       popup.anchorEl = el;
  //       popup.showAnchor(popup.anchorEl);
  //     } else {
  //       popup.hide();
  //     }
  //   } else if (/select|span/ig.test(el.tagName) && el.getAttribute('plugintype') === 'select') {
  //     let html = popup.formatHtml(
  //       '<nobr>下拉菜单: <span onclick=$$._edittext("select") class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
  //     if (html) {
  //       if (el.tagName == 'SPAN') {
  //         let elInput = el.getElementsByTagName("select");
  //         el = elInput.length > 0 ? elInput[0] : el;
  //       }
  //       popup.getDom('content').innerHTML = html;
  //       popup.anchorEl = el;
  //       popup.showAnchor(popup.anchorEl);
  //     } else {
  //       popup.hide();
  //     }
  //   }
  // });
};
/**
 * 分隔符
 */
UE.plugins['pagination'] = function () {
  let me = this, pluginType = 'pagination';
  me.commands[pluginType] = {
    execCommand: function () {
      let dialog = new UE.ui.Dialog({
        iframeUrl: UE.leipiFormDesignUrl + 'pagination/index.html',
        name: pluginType,
        editor: this,
        title: '分页',
        cssRules: 'width:' + width + 'px;height:' + height + 'px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick: function () {
              dialog.close(true);
            }
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function () {
              dialog.close(false);
            }
          }]
      });
      dialog.render();
      dialog.open();
    }
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext: function () {
      baidu.editor.plugins[pluginType].editdom = popup.anchorEl;
      me.execCommand(pluginType);
      this.hide();
    },
    _delete: function () {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    }
  });
  popup.render();
  me.addListener('mouseover', function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    if (/p/ig.test(el.tagName) && el.getAttribute('plugintype') === pluginType) {
      var html = popup.formatHtml(
        '<nobr>分页: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
      if (html) {
        popup.getDom('content').innerHTML = html;
        popup.anchorEl = el;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};

UE.registerUI('button_page', function (editor, uiName) {
  if (!this.options.toolleipi) {
    return false;
  }
  // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand: function () {
      try {
        leipiFormDesign.exec('pagination');
      } catch (e) {
        alert('打开模板异常');
      }
    }
  });
  // 创建一个button
  let btn = new UE.ui.Button({
    // 按钮的名字
    name: uiName,
    // 提示
    title: '分页',
    // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
    cssRules: 'background-position: -460px -40px;',
    // 点击时执行的命令
    onclick: function () {
      // 这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName);
    }
  });
  // 因为你是添加button,所以需要返回这个button
  return btn;
});
UE.registerUI('button_fn_lib', function (editor, uiName) {
  if (!this.options.toolleipi) {
    return false;
  }
  // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand: function () {
      try {
        leipiFormDesign.exec('fn_lib');
      } catch (e) {
        alert('打开模板异常');
      }
    }
  });
  // 创建一个button
  var btn = new UE.ui.Button({
    // 按钮的名字
    name: uiName,
    // 提示
    title: '函数库',
    // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
    cssRules: 'background-position: -601px -40px;',
    // 点击时执行的命令
    onclick: function () {
      // 这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName);
    }
  });
  // 因为你是添加button,所以需要返回这个button
  return btn;
});
UE.registerUI('button_common_fields', function (editor, uiName) {
  if (!this.options.toolleipi) {
    return false;
  }
  editor.registerCommand(uiName, {
    execCommand: function () {
      try {
        leipiFormDesign.exec('common_fields');
      } catch (e) {
        alert('常用字段加载异常');
      }
    }
  });
  var btn = new UE.ui.Button({
    name: uiName,
    title: '常用字段',
    cssRules: 'background-position:-649px -77px;',
    onclick: function () {
      editor.execCommand(uiName);
    }
  });
  return btn;
});
UE.registerUI('button_preview', function (editor, uiName) {
  if (!this.options.toolleipi) {
    return false;
  }
  // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand: function () {
      try {
        leipiFormDesign.fnReview();
      } catch (e) {
        alert('leipiFormDesign.fnReview 预览异常');
      }
    }
  });
  // 创建一个button
  var btn = new UE.ui.Button({
    // 按钮的名字
    name: uiName,
    // 提示
    title: '预览',
    // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
    //  cssRules :'background-position: -420px -19px;',
    cssRules: "background:url('/client/static/formdesign/image/preview.gif') no-repeat center !important;background-attachment:scroll;",
    // 点击时执行的命令
    onclick: function () {
      // 这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName);
    }
  });
  // 因为你是添加button,所以需要返回这个button
  return btn;
});
