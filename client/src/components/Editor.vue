<template>
  <div>
    <textarea id="editor" ref="editor"></textarea>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css';
  import 'simplemde/dist/simplemde.min.css';
  import marked from 'marked';
  import highlight from 'highlight.js';
  import SimpleMDE from 'simplemde';

  let _sMDE;
  export default {
    name: 'Editor',
    data() {
      return {
        marked: {},
        sMDE: {},
        content: 'markdown'
      };
    },
    props: {},
    created() {
      this.initConfig();
    },
    mounted() {
      this.loadContainer();
    },
    beforeDestroy() {
      this.destoryEditor();
    },
    // watch: {
    //   content(value) {
    //     if (value !== '') {
    //       this.$nextTick(() => {
    //         if (this.sMDE && value !== this.sMDE.value()) {
    //           this.sMDE.value(value);
    //         }
    //       });
    //     }
    //   }
    // },
    methods: {
      initConfig() {
        const _this = this;
        const languages = ['cpp', 'xml', 'bash', 'coffeescript', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'less', 'makefile', 'nginx', 'php', 'python', 'scss', 'sql', 'stylus'];
        languages.forEach(value => {
          highlight.registerLanguage(value, require(`highlight.js/lib/languages/${value}`));
        });
        highlight.configure({
          classPrefix: ''
        });
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight(code, lang) {
            if (languages.includes(lang)) {
              return highlight.highlight(lang, code).value;
            } else {
              return highlight.highlight(code).value;
            }
          }
        });
        _this.marked = marked;
      },
      loadContainer() {
        const _this = this;
        _sMDE = new SimpleMDE({
          initialValue: _this.content,
          autoDownloadFontAwesome: false,
          // element: _this.$refs['editor'],
          element: document.querySelector('#editor'),
          previewRender(plainText) {
            return _this.marked(plainText);
          },
          spellChecker: false
        });
        _sMDE.codemirror.on('change', () => {
          let value = _sMDE.value();
          // if (_this.content !== value) {
          //   _this.content = value;
          // }
          // source code
          if (this.content === value) {
            return;
          }
          this.content = value;
        });
      },
      destoryEditor() {
        _sMDE.toTextArea();
        // let editor = document.querySelector('#editor');
        // editor.outerHTML = editor.outerHTML;
      }
    }
  };
</script>

<style scoped>

</style>
