# form-design-editor

> 一个基于Vue的多页面表单设计器

## 安装

``` bash
# install dependencies
npm install

# localserver load at localhost:3000 
npm run dev-server

# client with hot reload at localhost:8080
npm run dev-client

# build for production with minification
npm run build
```

>请先启动本地服务端再启动客户端，该项目目前数据都是本地模拟数据。

## 功能介绍
1. 进入主页面后请先点击“选择用户”，选择后点击确定。
2. 再点击“打开表单”，选择后点击“打开”。此时，编辑器内部会显示已有的模板。
3. 点击编辑器工具栏最右侧的“预览”按钮，可以看到表单解析后的样子。

至此完整的基本功能已经展示完毕，当然你也可以随意测试其他按钮控件。
点击右上角的“保存”按钮会在控制台输出编辑器内部HTML的base64转码。

