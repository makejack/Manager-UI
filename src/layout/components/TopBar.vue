<template>
  <div class="header-container">
    <div class="logo">
      <span class="logo-title">畅泊后台管理系统</span>
    </div>
    <div class="user">
      <el-dropdown @command="handlerCommand">
        <span class="user-name">
          {{userInfo? userInfo.userName : ''}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-key" command="modifyPwd">
            <span class="el-dropdown-item-title">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" command="logout" divided>
            <span class="el-dropdown-item-title">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'topbar',
  computed: {
    ...mapGetters({
      userInfo: 'user/getUser'
    })
  },
  methods: {
    ...mapActions({
      removeToken: 'user/remove_Token',
      logout: 'user/logout'
    }),
    handlerCommand(command) {
      if (command === 'logout') {
        this.logout()
          .then(res => {
            const body = res.data
            if (body.code === 200) {
              this.removeToken()
              this.$router.push({ name: 'login' })
            }
          })
          .catch(() => {
            this.$message.error('退出失败')
          })
      } else if (command === 'modifyPwd') {
        this.$router.push({ name: 'modify-password' })
      }
    }
  }
}
</script>

<style scoped>
.header-container {
  padding: 0 20px;
}
.logo {
  float: left;
}
.logo-title {
  line-height: 60px;
  font-size: 24px;
  padding: 0px 10px;
}
.user {
  float: right;
}
.user-name {
  line-height: 60px;
  padding: 20px 0px;
  cursor: pointer;
  color: #409eff;
}
.user-name:focus:not(.focusing) {
  outline-width: 0;
}
.el-dropdown-item-title {
  margin-left: 10px;
}
</style>
