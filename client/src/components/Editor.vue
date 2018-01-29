<template>
  <div>
    <textarea id="editor" ref="editor"></textarea>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css';
  import 'simplemde/dist/simplemde.min.css';
  import 'highlight.js/styles/vs2015.css';
  import marked from 'marked';
  import highlight from 'highlight.js';
  import SimpleMDE from 'simplemde';

  // let sMDE;
  export default {
    name: 'Editor',
    data() {
      return {
        marked: {},
        sMDE: {},
        content: ''
      };
    },
    props: {},
    created() {
    },
    mounted() {
      this.initEditor();
    },
    beforeDestroy() {
      this.destoryEditor();
    },
    watch: {
      content(value) {
        if (value !== '') {
          this.$nextTick(() => {
            if (this.sMDE && value !== this.sMDE.value()) {
              this.sMDE.value(value);
            }
          });
        }
      }
    },
    methods: {
      initEditor() {
        const _this = this;
        _this.sMDE = new SimpleMDE({
          autoDownloadFontAwesome: false,
          element: _this.$refs['editor'],
          showIcons: ['code', 'table'],
          tabSize: 4,
          renderingConfig: {
            codeSyntaxHighlighting: true
          },
          previewRender(plainText) {
            marked.setOptions({
              renderer: new marked.Renderer(),
              gfm: true,
              tables: true,
              breaks: true,
              pedantic: false,
              sanitize: false,
              smartLists: true,
              smartypants: false,
              xhtml: false,
              highlight(code) {
                return highlight.highlightAuto(code).value;
              }
            });
            return marked(plainText);
          },
          spellChecker: false
        });
        _this.sMDE.codemirror.on('change', () => {
          let value = _this.sMDE.value();
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
        this.sMDE.toTextArea();
        this.sMDE = null;
        // let editor = document.querySelector('#editor');
        // editor.outerHTML = editor.outerHTML;
      }
    }
  };
</script>

<style scoped>

</style>
