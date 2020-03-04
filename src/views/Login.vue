<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">畅泊后台管理系统</div>
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item prop="userName" :error="errMsg.UserName">
          <el-input v-model="loginForm.userName" @keyup.enter.native="login" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" :error="errMsg.Password">
          <el-input
            type="password"
            v-model="loginForm.password"
            @keyup.enter.native="login"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100" @click="login" :loading="loading">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      loginForm: {
        userName: '',
        password: ''
      },
      errMsg: {
        UserName: '',
        Password: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur']
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      set_Token: 'user/set_Token',
      signIn: 'user/signIn'
    }),
    clearFormErrorMsg() {
      this.errMsg['UserName'] = ''
      this.errMsg['Password'] = ''
    },
    login() {
      this.clearFormErrorMsg()
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.signIn(this.loginForm)
            .then(res => {
              const body = res.data
              if (body.code === 200) {
                this.$router.push('/')
              } else if (body.code === 400) {
                body.data.forEach(item => {
                  this.errMsg[item.key] = item.message
                })
              } else if (body.code === 500) {
                this.$message.error(body.message)
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          // http
          //   .post('auth/Login', this.loginForm)
          //   .then(res => {
          //     const body = res.data
          //     if (body.code === 200) {
          //       this.set_Token(body.data)
          //       this.$router.push('/')
          //     } else if (body.code === 400) {
          //       this.loading = false
          //       body.data.forEach(item => {
          //         this.errMsg[item.key] = item.message
          //       })
          //     } else if (body.code === 500) {
          //       this.loading = false
          //       this.$message.error(body.message)
          //     }
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.login-container {
  width: 340px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  box-shadow: 0px 0px 30px #ccc;
  background: #fff;
}
.login-title {
  font-size: 22px;
  text-align: center;
  margin: 20px 0px;
}
</style>
