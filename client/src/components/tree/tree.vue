<template>
  <div class="zTree_wrap">
    <ul :id="id" class="ztree"></ul>
    <component :name="skin" v-bind:is="skin"></component>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        default: 'zTree'
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      setting: {
        type: Object,
        default() {
          return {};
        }
      },
      skin: {
        type: String,
        default: ''
      },
      selectNode: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        treeObject: {}
      };
    },
    mounted() {
      require('@/plugins/zTree/js/jquery.ztree.core.min.js');
      require('@/plugins/zTree/js/jquery.ztree.excheck.min.js');
      this.initTree();
    },
    watch: {
      data: {
        handler: function () {
          this.initTree();
        },
        deep: true
      },
      setting: {
        handler: function () {
          this.initTree();
        },
        deep: true
      }
    },
    methods: {
      initTree() {
        $.fn.zTree.destroy('#' + this.id);
        this.treeObject = $.fn.zTree.init($('#' + this.id), this.settingInit, this.data);
        this.$emit('afterTreeInit', this.treeObject);

        let nodes = this.treeObject.getNodes();
        let toNode = {};

        if (nodes.length > 0) {
          if (this.selectNode) {
            let nodes = this.treeObject.transformToArray(this.treeObject.getNodes());
            for (let i = 0; i < nodes.length; i++) {
              if (this.selectNode === nodes[i].id) {
                toNode = nodes[i];
              }
            }
            this.treeObject.selectNode(toNode);
          } else {
            this.treeObject.selectNode(nodes[0]);
          }
        }
      },
      onClick(event, treeId, treeNode, clickFlag) {
        this.$emit('onClick', event, treeId, treeNode, clickFlag);
      },
      onDblClick(event, treeId, treeNode) {
        this.$emit('onDblClick', event, treeId, treeNode);
      },
      onCheck(event, treeId, treeNode) {
        this.$emit('onCheck', event, treeId, treeNode);
      },
      onRightClick(event, treeId, treeNode) {
        this.$emit('onRightClick', event, treeId, treeNode);
      }
    },
    computed: {
      settingInit() {
        // eslint-disable-next-line
        this.setting.callback = {
          onClick: this.onClick,
          onDblClick: this.onDblClick,
          onCheck: this.onCheck,
          onRightClick: this.onRightClick
        };
        return this.setting;
      }
    },
    components: {
      'zTreeStyle': resolve => {
        require(['./skin/zTreeStyle'], resolve);
      },
      'metroStyle': resolve => {
        require(['./skin/metroStyle'], resolve);
      }
    }
  };
</script>

<style>
  .el-pagination__jump {
    margin-right: 10px;
  }
</style>
