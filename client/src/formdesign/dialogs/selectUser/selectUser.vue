<template>
  <div class="container">
    <el-tabs class="tabs" type="border-card" v-model="activeName">
      <el-tab-pane class="tab-pane" label="选择用户">
        <ul class="user-list">
          <li v-for="user in userList" :key="user.USER_CN" class="user-item" :class="{selected:user.webData.selected}"
              @click="selectUser(user)">{{user.USER_DISPLAYNAME}}
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
  }

  .tabs {
    margin: 2vw;
    min-height: 380px;
  }

  .tab-pane {
    margin-top: 2vw;
  }

  .user-list {
    height: 290px;
    border: 1px solid #dfe6ec;
    border-radius: 4px;
  }

  .user-item {
    padding: 10px;
    line-height: 2.5;
    font-size: 14px;
    cursor: pointer;
  }

  .user-item:hover {
    background: #eef1f6;
  }

  .user-list .selected {
    color: #fff;
    background: #4f98ff;
  }
</style>

<script>
  import {getAuthorUserList} from '@/api/formdesign';

  export default {
    data() {
      return {
        activeName: '',
        selectedUser: {},
        userList: []
      };
    },
    created() {
      getAuthorUserList().then(res => {
        if (res.status === 'success') {
          let userInfo = sessionStorage.getItem('selectedUser');
          res.data.forEach(v => {
            v.webData = {};
            if (v.USER_CN === userInfo) {
              this.selectedUser = v;
              v.webData.selected = true;
            } else {
              v.webData.selected = false;
            }
          });
          this.userList = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    mounted() {
      let self = this;
      const dialog = window.parent.$EDITORUI[window.frameElement.id.replace(/_iframe$/, '')];
      dialog.onok = function () {
        if (self.selectedUser && self.selectedUser.USER_CN && self.selectedUser.USER_CN.length > 0) {
          sessionStorage.setItem('selectedUser', self.selectedUser.USER_CN);
          sessionStorage.setItem('selectedUserName', self.selectedUser.USER_DISPLAYNAME);
        } else {
          self.$message.error('请选择数据用户');
          return false;
        }
      };
    },
    methods: {
      selectUser(user) {
        this.userList.forEach(v => {
          v.webData.selected = v === user;
        });
        if (user.webData.selected) {
          this.selectedUser = user;
        }
      }
    }
  };
</script>
