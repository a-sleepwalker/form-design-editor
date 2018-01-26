<template>
  <div class="hello">
    <textarea name="" id="editor"></textarea>
  </div>
</template>

<script>
  import marked from 'marked';
  // import highlight from 'highlight.js';
  import SimpleMDE from 'simplemde';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        smde: {}
      };
    },
    mounted() {
      this.smde = new SimpleMDE({
        element: document.getElementById('editor')
      });
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true
      });
    },
    components: {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
