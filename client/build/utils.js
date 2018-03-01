'use strict'
const path = require('path')
const config = require('../config/index')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../../package.json')
const glob = require('glob');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.getEntriesNew = function (str) {
  let includePage = [
    'formdesign_index',
    'formdesign_dialogs_selectUser_index',
    'formdesign_dialogs_newForm_index',
    'formdesign_dialogs_propertyForm_index',
    'formdesign_dialogs_openForm_index',
    'formdesign_dialogs_text_index',
    'formdesign_dialogs_textarea_index',
    'formdesign_dialogs_select_index',
    'formdesign_dialogs_radio_index',
    'formdesign_dialogs_checkbox_index',
    'formdesign_dialogs_innerGrid_index',
    'formdesign_dialogs_pagination_index',
    'formdesign_dialogs_commonField_index',
    'formdesign_dialogs_lib_index',
    'formdesign_user_index'
  ];
  let entries, tmp, pathname;
  entries = glob.sync(str).reduce((res, entry) => {
    tmp = entry.replace(/.+\/([^\/]+)\/$/, '$1');
    pathname = tmp;
    res[pathname] = path.resolve(entry);
    return res;
  }, {});
  Object.keys(entries).forEach(value => {
    let name = value.replace('client/src/pages/', '').replace(/\//g, '_').replace('.js', '').replace('index_index', 'index');
    entries[name] = entries[value];
    delete entries[value];
  });
  let entryres = {};
  if (includePage.length > 0) {
    includePage.forEach(value => {
      entryres[value] = entries[value];
    });
  } else {
    entryres = entries;
  }
  console.log(entryres);
  return entryres;
};

exports.getEntries = function (str) {
  let includePage = [
    'formdesign_index',
    'formdesign_dialogs_selectUser_index',
    'formdesign_dialogs_newForm_index',
    'formdesign_dialogs_propertyForm_index',
    'formdesign_dialogs_openForm_index',
    'formdesign_dialogs_text_index',
    'formdesign_dialogs_textarea_index',
    'formdesign_dialogs_select_index',
    'formdesign_dialogs_radio_index',
    'formdesign_dialogs_checkbox_index',
    'formdesign_dialogs_innerGrid_index',
    'formdesign_dialogs_pagination_index',
    'formdesign_dialogs_commonField_index',
    'formdesign_dialogs_lib_index',
    'formdesign_user_index'
  ];
  let home = 'InternetPlus';
  var entries, tmp, pathname;
  entries = glob.sync(str).reduce((result, entry) => {
    tmp = entry.replace(/.+\/([^\/]+)\/$/, '$1');
    pathname = tmp;
    result[pathname] = path.resolve(entry);
    return result;
  }, {});
  for (var name in entries) {
    let temp_name = name;
    temp_name = temp_name.replace("client/src/pages/", "").replace(/\//g, "_").replace(".js", "").replace("" + home + "_", "").replace("index_index", "index");
    entries[temp_name] = entries[name];
    delete entries[name];
  }
  var entryres = {};
  if (includePage.length > 0) {
    for (var name in entries) {
      for (let i = 0; i < includePage.length; i++) {
        if (name === includePage[i]) {
          entryres[name] = entries[name];
          break;
        }
      }
    }
  } else {
    entryres = entries;
  }
  // console.log(entryres);
  return entryres;
};

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
};
